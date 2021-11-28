import React, {useEffect, useState} from "react";

export const Contrato = (props) => {
    const [listaContrato, setListaContrato] = useState([]);
    const [Cedula, setCedula] = useState("");
    const [Nombres, setNombres] = useState("");
    const [Apellidos, setApellidos] = useState("");
    const [Dirección, setDirección] = useState("");
    const [Teléfono, setTeléfono] = useState("");
    const [DescripciónServicio, setDescripciónServicio] = useState("");
    const [CostoServicio, setCostoServicio] = useState("");

    let ContratoId = '';
    if (props.match) ContratoId = props.match.params.ContratoId;

    const listardatos = async () =>{
        const querySnapshot = await getDocs(collection(fs, "Contrato"));
        querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
    }
    useEffect(() => {
        listardatos()
        }, [])
    
    const getContrato = async () => {
        let obj;
        let lista = []
        const querySnapshot = await fs.collection("Contrato").get();
        querySnapshot.forEach((doc) => {
            obj = doc.data()
            obj.id = doc.id
            lista.push(obj) 
        });
        setListaContrato(lista)
    }
    
    const addContrato = async () => {
        const obj = {Cedula, Nombres, Apellidos, Dirección, Teléfono, DescripciónServicio, CostoServicio}
        const fsRef = await fs.collection("Contrato").add(obj)
        console.log(fsRef.id)
        clearInput()
        getContrato()
    }
    
    const clearInput = () => {
        setCedula('')
        setNombres('')
        setApellidos('')
        setDirección('')
        setTeléfono('')
        setDescripciónServicio('')
        setCostoServicio('')
    }

    const handleAgregarClick = (e) => {
        e.preventDefault();
        if (!ContratoId) {
        try {
            const docRef =  addDoc(collection(fs, "Contrato"), {
                Cedula,
                Nombres,
                Apellidos,
                Dirección,
                Teléfono,
                DescripciónServicio,
                CostoServicio
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          } 
          }
        }
        const Validar = e => {
            e.preventDefault();
        }

        return( <>
        <br/>
        <h2 className='encabezadomin'>REGISTRO DE CLIENTES</h2>
        <br/>
        <div className='Contenedormin'>  
            <form className = "formulamin" onSubmit = { Validar } >
                    <div className='formulario-cedula'>
                        < label className="form-labmin"> CÉDULA </label> 
                        <div className="form-grupo-inpmin">
                            <input id='cn' name='cedula' type='text' className="form-inpmin" placeholder = "Cédula"
                            value = {
                                Cedula
                            }
                            onChange = {
                                (e) => setCedula(e.target.value)
                            }
                            />
                        </div>
                    </div>
                    <div className='formulario-nombre'>
                        <label className="form-labmin"> NOMBRES</label> 
                        <div className="form-grupo-inpmin">
                            <input id='cn' name='nombres' className="form-inpmin" placeholder = "Nombres"
                            value = {
                                Nombres
                            }
                            onChange = {
                                (e) => setNombres(e.target.value)
                            }
                            />
                        </div>
                    </div>
                    <div className='formulario-apellido'>
                        <label className="form-labmin"> APELLIDOS</label> 
                        <div className="form-grupo-inpmin">
                            <input id='cn' name='apellidos' type='text' className="form-inpmin" placeholder = "Apellidos"
                            value = {
                                Apellidos
                            }
                            onChange = {
                                (e) => setApellidos(e.target.value)
                            }
                            />
                        </div>
                    </div>
                    <div className='formulario-direccion'>
                        <label className="form-labmin"> DIRECCIÓN</label> 
                        <div className="form-grupo-inpmin">
                            <input id='cn' name='direccion' type='text' className="form-inpmin" placeholder = "Dirección"
                            value = {
                                Dirección
                            }
                            onChange = {
                                (e) => setDirección(e.target.value)
                            }
                            />
                        </div>
                    </div>
                    <div className='formulario-telefono'>
                        <label className="form-labmin"> TELÉFONO</label> 
                        <div className="form-grupo-inpmin">
                            <input id='cn' name='telefono' type='text' className="form-inpmin" placeholder = "Teléfono"
                            value = {
                                Teléfono
                            }
                            onChange = {
                                (e) => setTeléfono(e.target.value)
                            }
                            />
                        </div>
                    </div>
                    <div className='formulario-descripción'>
                        <label className="form-labmin"> DESCRIPCIÓN DEL SERVICIO </label> 
                        <div className="form-grupo-inpmin">
                            <input id='cn' name='descripcion' type='text' className="form-inpmin" placeholder = "Descripción del servicio"
                            value = {
                                DescripciónServicio
                            }
                            onChange = {
                                (e) => setDescripciónServicio(e.target.value)
                            }
                            />
                        </div>
                    </div>
                    <div className='formulario-costo'>
                        <label className="form-labmin"> COSTO DEL SERVICIO</label>
                        <div className="form-grupo-inpmin"> 
                            <input id='cn' name='costo' type='number' className="form-inpmin" placeholder = "Costo del servicio"
                            value = {
                                CostoServicio
                            }
                            onChange = {
                                (e) => setCostoServicio(e.target.value)
                            }
                            />
                        </div>
                    </div>
                    <div className="form-grupo-form-btn-enviarmin">
                        <button id='cn' className="btmin"
                        onClick = {handleAgregarClick}>
                        GUARDAR 
                        </button>
                    </div>
                </form>
                
            </div>
            { <div>
                {listaContrato.map((Contrato, index) => {
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{Contrato.Cedula}</td>
                        <td>{Contrato.Nombres}</td>
                        <td>{Contrato.Apellidos}</td>
                        <td>{Contrato.Dirección}</td>
                        <td>{Contrato.TeléfipciónServicio}</td>
                        <td>{Contrato.CostoSono}</td>
                        <td>{Contrato.Descrervicio}</td>
                    </tr>
                })}
            </div>}
            
            </>
        )
    
}