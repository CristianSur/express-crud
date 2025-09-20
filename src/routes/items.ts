import express from "express";
import type { Request, Response } from "express"; // types only

// @ts-ignore
import type { Item } from "../models/Item";
import prisma from "../db/db.js"
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();


// Create (POST)
router.post("/", asyncHandler(async (req: Request, res: Response) => {
    const {name} = req.body as { name?: string };
    if (!name) {
        return res.status(400).json({error: "Name is required"});
    }

    const newItem: Item = await prisma.item.create({data: {name}});
    res.status(201).json(newItem);

}));

// Read All (GET)
router.get("/", asyncHandler(async (req: Request, res: Response) => {
    const items: Item[] = await prisma.item.findMany({
        orderBy: { id: "asc" },
    })
    res.json(items);
}));

// Read One (GET)
router.get("/:id", asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const item = await prisma.item.findUnique({ where: { id } });
    if (!item) {
        return res.status(404).json({error: "Item not found"});
    }
    res.json(item);
}));

// Update (PUT)
router.put("/:id", asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const {name} = req.body as { name?: string };

    if (!name) {
        return res.status(400).json({error: "Name is required"});
    }

    const updatedItem = await prisma.item.update({
        where: { id },
        data: { name },
    });
    res.json(updatedItem);
}));

// Delete (DELETE)
router.delete("/:id", asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    await prisma.item.delete({ where: { id } });
    res.status(204).send();
}));

export default router;
