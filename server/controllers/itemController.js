import Item from "../models/Item.js";
import sendResponse from "../lib/response.js";

export const reportItem = async (req, res) => {
  try {
    const { name, image, description, location, tag, foundDate } = req.body;

    // User ID from token (assumed you've added auth middleware)
    const userId = req.user?.id;
    const email = req.user?.email;
    // console.log(email, userId);
    if (!name || !image || !description || !location || !tag || !foundDate) {
      return sendResponse(res, false, "All fields are required", {}, 400);
    }

    const newItem = new Item({
      name,
      image,
      description,
      location,
      tag,
      email,
      userId,
      foundDate,
    });

    await newItem.save();

    return sendResponse(
      res,
      true,
      "Item reported successfully",
      { item: newItem },
      201
    );
  } catch (err) {
    return sendResponse(
      res,
      false,
      "Server Error",
      { error: err.message },
      500
    );
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    return sendResponse(res, true, "Items fetched successfully", { items });
  } catch (err) {
    return sendResponse(
      res,
      false,
      "Server Error",
      { error: err.message },
      500
    );
  }
};

export const getUserItems = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed as a URL parameter
    // console.log(userId);
    if (!userId) {
      return sendResponse(res, false, "User ID is required", {}, 400);
    }

    // Find items where userId matches the provided userId
    const items = await Item.find({ userId }).sort({ createdAt: -1 });

    if (items.length === 0) {
      return sendResponse(res, false, "No items found for this user", {}, 404);
    }

    return sendResponse(res, true, "Items fetched successfully", { items });
  } catch (err) {
    return sendResponse(
      res,
      false,
      "Server Error",
      { error: err.message },
      500
    );
  }
};
