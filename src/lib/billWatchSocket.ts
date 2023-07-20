import Bill from "@/models/bill";
import Money from "@/models/money";
import User from "@/models/user";
import { IBillModel } from "@/types/interfaces/bill";
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
      io.emit("bill::update", {
        id: data.documentKey._id.toString(),
        updated: JSON.stringify(data.updateDescription.updatedFields),
      });
    }

    if (data.operationType === "delete") {
      io.emit("bill::delete", data.documentKey._id.toString());
    }
  });
};

export default billWatchSocket;
