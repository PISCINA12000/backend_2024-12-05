import { Router } from "express"
import PrivilegioCtrl from "../Controle/privilegiosCtrl.js"

const pvlCtrl = new PrivilegioCtrl()
const rotaPrivilegio = Router()

rotaPrivilegio.post("/", pvlCtrl.gravar)
rotaPrivilegio.put("/:codigo", pvlCtrl.editar)
rotaPrivilegio.patch("/:codigo", pvlCtrl.editar)
rotaPrivilegio.delete("/:codigo", pvlCtrl.excluir)
rotaPrivilegio.get("/:codigo", pvlCtrl.consultar)
rotaPrivilegio.get("/", pvlCtrl.consultar)

export default rotaPrivilegio