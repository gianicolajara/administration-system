/* import Bill from "@/models/bill";
import Money from "@/models/money";
import User from "@/models/user";
import { IBillModel, IBillResponse } from "@/types/interfaces/bill";
import { ChangeStreamDocument } from "mongodb";
import { Server } from "socket.io";

const billWatchSocket = (io: Server) => {
  Bill.watch().on("change", async (data: ChangeStreamDocument<IBillModel>) => {
    if (data.operationType === "insert") {
      const hydrateDocument = Bill.hydrate(data.fullDocument).toJSON();

      const user = await User.findById(hydrateDocument.user);
      const typeOfCurrency = await Money.findById(
        hydrateDocument.typeOfCurrency
      );

      io.emit("bill::insert", {
        ...hydrateDocument,
        user,
        typeOfCurrency,
      });
    }

    if (data.operationType === "update") {
      let item = data.updateDescription.updatedFields as Partial<IBillResponse>;
      let itemToSend = {};

      if (item.typeOfCurrency) {
        const typeOfCurrency = await Money.findById(item.typeOfCurrency);

        itemToSend = {
          ...item,
          typeOfCurrency,
        };
      }
      io.emit("bill::update", {
        id: data.documentKey._id.toString(),
        updated: JSON.stringify(itemToSend ? itemToSend : item),
      });
    }

    if (data.operationType === "delete") {
      io.emit("bill::delete", data.documentKey._id.toString());
    }
  });
};

export default billWatchSocket;
 */
