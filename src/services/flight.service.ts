import { API_ROUTES } from "@/constants/apiRoutes";
import { IFlight } from "@/pages/api/search";
import { sendApiRequest } from "./request.service";

export const searchFlight = async (
  origin = "",
  destination = "",
  departureDate = "",
  returnDate = ""
): Promise<Array<IFlight>> => {
  return await sendApiRequest(
    API_ROUTES.FLIGHT_SEARCH +
      new URLSearchParams({
        origin,
        destination,
        departureDate,
        returnDate
      }),
    "GET",
    null
  );
};
