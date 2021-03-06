const query = require("../database/pool-conexion");
const controlador = {};

controlador.Vista = (req, res) => {
    try{
        res.render('admin/puntoventa',{profile: req.session.user})
    }
    catch(e){
        console.log(e)
    }
};
controlador.ListarEncargadoPV = async (req, res) => {
    try {
        var sql = "SELECT * FROM personas WHERE Rol = 'Punto Venta'";
        let rows = await query(sql);
        return res.json(rows)

    } catch (e) {
        console.log(e);
    }
}
controlador.ListaPuntoventa = async (req, res) => {
    try{
        var sql = "select punto_venta.Estado as EstadoPVent, Id_punto_vent,Sede,Nombre,Nombres,fk_persona, personas.Direccion as dirPersona, punto_venta.Direccion as dirPunto from punto_venta join personas on fk_persona=identificacion";
        let rows = await query(sql);
        return res.json(rows)
    }
    catch(e){
        console.log(e)
    }
};
controlador.RegistrarPunto = async (req, res)=>{
    try{
        let nombre = req.body.Nombre;
        let sede = req.body.Sede;
        let dir = req.body.Direccion;
        let estado = req.body.Estado;
        let persona = req.body.Persona;
        var sql = `insert into punto_venta(Sede,Direccion,Nombre,Estado, fk_persona)values('${sede}','${dir}','${nombre}','${estado}','${persona}')`;
        await query(sql);
        return res.json({  
            titulo : "Registro Exitoso",
            icono: "success",
            mensaje : "El punto ha sido regsitrado con éxito",
            timer : 2000
        });
    }
    catch(e){
       console.log(e);
    }
}

controlador.Buscarpuntv = async(req, res)=>{
    try{
        var identificador = req.body.Identificacion;
        let sql = 'select * from punto_venta where Id_punto_vent='+identificador;
        let rows = await query(sql);
        return res.json(rows);
    }
    catch(e){
        console.log(e);
    }
};
controlador.Actualformpuntv = async(req, res)=>{
    try{
        var identificador = req.body.Identificacion;
        let nombre = req.body.Nombre;
        let sede = req.body.Sede;
        let direccion = req.body.Direccion;
        let estado = req.body.Estado;
        let PersonaEncargada = req.body.PersonaEncargada;
        let sql = `update punto_venta set Nombre='${nombre}',
                    Sede='${sede}',
                    Estado='${estado}',
                    Direccion='${direccion}',
                    fk_persona='${PersonaEncargada}'  where Id_punto_vent=${identificador}`;
        await query(sql);
        return res.json({  
            titulo : "Actualizado con Exito",
            icono: "success",
            mensaje : "El punto ha sido Actualizado con éxito",
            timer : 2000
    });
    }catch(e){
        console.log(e);
    }
};
module.exports = controlador;