import { IStatePassengers } from "@/component/PassengerSelectForm";

export const convertPassengersToTextFormat = (
  passengers: IStatePassengers,
  reverse: boolean
) => {
  console.log(passengers, Object.keys(passengers).length);
  return Object.keys(passengers).map((passenger) => {
    return passengers[passenger] > 0
      ? reverse
        ? ` ${passengers[passenger]} ${passenger}`
        : ` ${passenger} ${passengers[passenger]}`
      : undefined;
  }).filter(item => !!item);
};
