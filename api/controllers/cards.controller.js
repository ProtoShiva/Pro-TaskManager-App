import Check from "../models/check.model.js"

export const createCards = async (req, res, next) => {
  let cardId = req.user.id
  try {
    const { title, priority, duedate, inputs, checked } = req.body
    const cardDoc = await Check.create({
      owner: cardId,
      title,
      priority,
      duedate,
      inputs,
      checked
    })
    res.json(cardDoc)
  } catch (error) {
    next(error)
  }
}

export const getAllCards = async (req, res, next) => {
  try {
    const { status, userId } = req.query
    res.json(await Check.find({ status: status, owner: userId }))
  } catch (error) {
    next(error)
  }
}

export const updates = async (req, res, next) => {
  const { id } = req.params
  const { title, priority, duedate, inputs } = req.body
  try {
    const cid = req.user.id
    const placeDoc = await Check.findById(id)

    if (!placeDoc) {
      return res.status(404).json({ message: "Card not found" })
    }

    if (cid !== placeDoc.owner.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this card" })
    }

    placeDoc.set({
      title,
      priority,
      duedate,
      inputs
    })

    await placeDoc.save()

    res.json("ok")
  } catch (error) {
    next(error)
  }
}

export const getCard = async (req, res, next) => {
  const { id } = req.params
  try {
    res.json(await Check.findById(id))
  } catch (error) {
    next(error)
  }
}

export const updateStatus = async (req, res, next) => {
  const { id } = req.params
  const { status } = req.body
  try {
    const placeDoc = await Check.findById(id)
    const cid = req.user.id
    if (!placeDoc) {
      return res.status(404).json({ message: "Card not found" })
    }

    if (cid !== placeDoc.owner.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this card" })
    }

    placeDoc.set({
      status
    })

    await placeDoc.save()
    const updatedCard = await Check.findOne({ _id: id })

    res.status(200).json(updatedCard)
  } catch (error) {
    next(error)
  }
}

export const deleteCard = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await Check.findByIdAndDelete(id)

    if (!result) {
      return res.status(404).send("Card with the given ID was not found.")
    }

    res.send(result)
  } catch (error) {
    next(error)
  }
}
