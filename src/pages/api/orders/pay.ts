import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { prisma } from "@/server";
import { PayPalOrderStatusResponse } from "@/interfaces";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return payOrder(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET_ID = process.env.PAYPAL_SECRET_ID;

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_ID}`,
    "utf-8"
  ).toString("base64");

  const body = new URLSearchParams("grant_type=client_credentials");

  try {
    const { data } = await axios.post(
      process.env.PAYPAL_OAUTH_URL || "",
      body,
      {
        headers: {
          Authorization: `Basic ${base64Token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }

    return null;
  }
};

async function payOrder(req: NextApiRequest, res: NextApiResponse<Data>) {
  // Todo: validar sesión del usuario
  // Todo: validad uuid

  // Obtenemos el token de validación
  const paypalBearerToken = await getPaypalBearerToken();

  if (!paypalBearerToken) {
    return res.status(400).json({ message: "Could not confirm paypal token" });
  }

  const { transactionId = "", orderId = "" } = req.body;

  try {
    // hacer request para verificar si el transactionId esta pagado
    const { data } = await axios.get<PayPalOrderStatusResponse>(
      `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${paypalBearerToken}`,
        },
      }
    );

    if (data.status !== "COMPLETED") {
      return res.status(401).json({ message: "Unrecognized order" });
    }

    // Buscar orden por id
    const dbOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!dbOrder) {
      return res
        .status(400)
        .json({ message: "Order does not exist in our database" });
    }

    // Si los montos son diferentes a las de paypal
    if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
      return res.status(400).json({
        message: "The amounts of paypal and our order are not the same",
      });
    }

    // We update the order to paid
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
        isPaid: true,
        paidAt: new Date(),
      },
    });

    return res.status(200).json({ message: "Paid order" });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      return res
        .status(400)
        .json({ message: error.response?.data || error.message });
    }

    console.log(error);
    return res
      .status(400)
      .json({ message: "Something went wrong, please talk with support" });
  }
}
