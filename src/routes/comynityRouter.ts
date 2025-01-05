import { Router } from "express";
import { CommynityController } from "../controllers/ComynityController"

const router = Router()

router.get('/', CommynityController.getAll)
router.get('/:id', CommynityController.getById)
router.post('/', CommynityController.create)
router.put('/:id', CommynityController.update)
router.delete('/:id', CommynityController.deleteById)


export default router