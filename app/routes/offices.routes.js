import { Router } from "express";
import OfficeModel from "../schemas/offices.schema.js";
import qrcode from "qrcode";
const officeRouter = Router();

officeRouter.get("/all", (req, res, next) => {
    OfficeModel.find({}).then(offices => {
        res.send(offices)
    })
})

officeRouter.get('/:id', (req, res, next) => {
    const office_id = req.params.id;
    OfficeModel.findOne({_id: office_id}).then(atm => {
        res.send(atm)
    })
})

officeRouter.post('/take_queue', (req, res) => {
    const departmentId = req.body._id;
    if (!departmentId) {
      return res.status(400).json({ error: 'ID отделения не указан' });
    }
    const uniqueText = `${departmentId}_${Date.now()}`;
  
    qrcode.toDataURL(uniqueText, (err, qrCode) => {
      if (err) {
        return res.status(500).json({ error: 'Ошибка генерации QR-кода' });
      }
  
      res.json({ qrCodeUrl: qrCode });
    });
  });

export default officeRouter;