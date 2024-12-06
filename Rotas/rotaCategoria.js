import { Router } from "express"
import CategoriaCtrl from "../Controle/categoriaCtrl.js"

const catCtrl = new CategoriaCtrl()
const rotaCategoria = Router()

rotaCategoria.post("/", catCtrl.gravar)
rotaCategoria.put("/:codigo", catCtrl.editar)
rotaCategoria.patch("/:codigo", catCtrl.editar)
rotaCategoria.delete("/:codigo", catCtrl.excluir)
rotaCategoria.get("/:codigo", catCtrl.consultar)
rotaCategoria.get("/", catCtrl.consultar)

export default rotaCategoria