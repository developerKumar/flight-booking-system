// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dayjs from "dayjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';

export interface IFlight {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  seatAvailability: number;
  price: {
    amount: number;
    currency: string;
  };
  offerType: string;
  uuid: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IFlight[]>
) {
  const {
    origin = "",
    destination = "",
    returnDate = "",
    departureDate = "",
  } = req.query;
  res.status(200).json([
    {
      origin: origin.toString(),
      destination: destination.toString(),
      departureDate: departureDate.toString(),
      returnDate: returnDate.toString(),
      seatAvailability: Math.floor(Math.random() * 11),
      price: {
        amount: Math.floor(Math.random() * 1000),
        currency: "EUR",
      },
      offerType: "BEST price",
      uuid: uuidv4(),
    },
    {
      origin: origin.toString(),
      destination: destination.toString(),
      departureDate: departureDate.toString(),
      returnDate: dayjs(new Date(returnDate.toString())).add(Math.floor(Math.random() * 50), 'days').toString(),
      seatAvailability: Math.floor(Math.random() * 11),
      price: {
        amount: Math.floor(Math.random() * 1000),
        currency: "EUR",
      },
      offerType: "BEST price",
      uuid: uuidv4(),
    },
    {
      origin: origin.toString(),
      destination: destination.toString(),
      departureDate: departureDate.toString(),
      returnDate: dayjs(new Date(returnDate.toString())).add(Math.floor(Math.random() * 50), 'days').toString(),
      seatAvailability: Math.floor(Math.random() * 11),
      price: {
        amount: Math.floor(Math.random() * 1000),
        currency: "EUR",
      },
      offerType: "BEST price",
      uuid: uuidv4(),
    },
    {
      origin: origin.toString(),
      destination: destination.toString(),
      departureDate: departureDate.toString(),
      returnDate: dayjs(new Date(returnDate.toString())).add(Math.floor(Math.random() * 50), 'days').toString(),
      seatAvailability: Math.floor(Math.random() * 11),
      price: {
        amount: Math.floor(Math.random() * 1000),
        currency: "EUR",
      },
      offerType: "BEST price",
      uuid: uuidv4(),
    },
    {
      origin: origin.toString(),
      destination: destination.toString(),
      departureDate: departureDate.toString(),
      returnDate: dayjs(new Date(returnDate.toString())).add(Math.floor(Math.random() * 50), 'days').toString(),
      seatAvailability: Math.floor(Math.random() * 11),
      price: {
        amount: Math.floor(Math.random() * 1000),
        currency: "EUR",
      },
      offerType: "BEST price",
      uuid: uuidv4(),
    },
  ]);
}
