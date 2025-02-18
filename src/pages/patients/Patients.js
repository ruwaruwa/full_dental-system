import React, { useState } from "react"
import MetaTags from 'react-meta-tags';
import { MDBDataTable } from "mdbreact"
import { Col, Container, Row, Table, Button, Modal, Card, CardBody, CardTitle, } from "reactstrap"
import axios from "axios"
import { useEffect } from "react";
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
// const Dashboard = () => {
//   const [menu, setMenu] = useState(false)
//   const toggle = () => {
//     setMenu(!menu)
//   }
//   useEffect(() => {
//    async function onload () {
//      try {
//       const epiEndPoint = "http://localhost:5000/courses";
//       const { data } = await axios.get(epiEndPoint)
//       console.log("data",data)

//      } catch (error) {
//       console.log(error.message)
//      }
//     }
//     onload()
//   }, [])

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <MetaTags>
//           <title>Dashboard | Veltrix - Responsive Bootstrap 5 Admin Dashboard</title>
//         </MetaTags>
//         <Container fluid>
//           <div className="page-title-box">
//             <Row className="align-items-center">
//               <Col md={8}>
//                 <h6 className="page-title">Dashboard</h6>
//                 <ol className="breadcrumb m-0">
//                   <li className="breadcrumb-item active">Welcome to Sels home</li>
//                 </ol>
//               </Col>

//               <Col md="4">
//                 <div className="float-end d-none d-md-block">

//                 </div>
//               </Col>
//             </Row>
//           </div>
//         </Container>
//       </div>
//     </React.Fragment>
//   )
// }
function Patients() {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()
    const [edit, setedit] = useState(false)
    const [editId, seteditId] = useState()
    const [selis, setselis] = useState([])
    const [rus, setrus] = useState(new Date())
    const [isOpen, setisOpen] = useState(false)
    const [menu, setMenu] = useState(false)
    const toggle = () => {
        setMenu(!menu)
    }

    useEffect(() => {
        const selislist = async () => {
            const sel_lists = await axios.get('http://localhost:3000/patient')

            //console.log(catagorlis.data)
            const xogsels = await sel_lists.data
            setselis(xogsels)
            console.log(xogsels)
        }
        selislist()
    }, [rus])

    //pos
    const selsave = async (event) => {
        //event.preventDefault();
        //alert('hi ruweid')
        //const xog= new FormData(event.target)
        console.log(event)

        if (edit) {
            const urlupdate = `http://localhost:3000/patient/${editId}`
            const updsels = await axios.put(urlupdate, event)
            reset()
            setedit(false)
            console.log(updsels)
            setrus(new Date())
            Swal.fire(
                'Done!',
                'Your data has been Updated.',
                'success'
            )
        }
        else {

            const additems = await axios.post('http://localhost:3000/patient', event,)
            console.log(additems)
            //console.log(newitem)
            if (additems.data.status == 'Success') {
                Swal.fire(
                    'Done!',
                    'Your data has been saved.',
                    'success'
                )
                reset()
                setrus(new Date())
            }   //setcagory([additems.data.info,...catagory] }
        };


    }
    //put

    function tog_standard() {
        setisOpen(!isOpen)

    }

    function CloseTog() {
        setisOpen(!isOpen)
        setedit(false)
        reset();

    }



    //del
    const deletes = async (id) => {
        alert(id)
        const delet = await axios.delete(`http://localhost:3000/patient/${id}`);
        console.log(delet)
        Swal.fire(
            'Done!',
            'Your file has been deleted.',
            'success'
        )
        setrus(new Date())
    }
    //update
    const Selsedit = async (Data) => {
        console.log(Data.name)
        setValue("name", Data.name)
        console.log(Data.age)
        setValue("age", Data.age)
        console.log(Data.gender)
        setValue("gender", Data.gender)
        console.log(Data.phone)
        setValue("phone", Data.phone)
        console.log(Data.address)
        setValue("address", Data.address)
        console.log(Data.date)
        setValue("date", Data.date)
        seteditId(Data._id)
        setedit(true)
        setisOpen(true)

    }
    const data = {

        columns: [

            {
                label: "Patient Name",
                field: "name",
                sort: "asc",
                width: 300,

            },
            {
                label: "age",
                field: "age",
                sort: "asc",
                width: 200,
            },
            {
                label: "gender",
                field: "gender",
                sort: "asc",
                width: 200,
            },
            {
                label: "address",
                field: "address",
                sort: "asc",
                width: 200,
            },
            {
                label: "phone",
                field: "price",
                sort: "asc",
                width: 200,
            },
            // {
            //     label: "Price",
            //     field: "price",
            //     sort: "asc",
            //     width: 200,
            // },
            {
                label: " Date",
                field: "date",
                sort: "asc",
                width: 100,
            },


            {
                label: "Action",
                field: "action",
                sort: "asc",
                width: 150,
            },
        ],
        rows: selis?.map(data => {
            data.action = (
                <div className="d-flex">
                    {/* <button onClick={() => HandleEdit(data)} className='btn btn-primary'>Edit</button> */}
                    <Button onClick={() => Selsedit(data)} className="bg-success ion ion-md-create text-white"></Button>
                    <Button onClick={() => deletes(data._id)} className='btn btn-danger ms-2'><i className="ion ion-md-trash font-size-16" /></Button>
                    <Button onClick={() => deletes(data._id)} className='btn btn-danger ms-2'><i className="ion ion-md-trash font-size-16" /></Button>
                </div>
            )



            return data
        })
    }


 return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Patient</title>
                </MetaTags>
                <Container fluid>
                    <div className="page-title-box">
                        <Modal
                            isOpen={isOpen}
                        // toggle={() => {
                        //   tog_standard()
                        // }}
                        >
                            <div className="modal-header">
                                <h5 className="modal-title mt-0" id="myModalLabel">
                                    Patient
                                </h5>
                                <button
                                    type="button"
                                    onClick={() => CloseTog()}
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(selsave)}>
                                    {/* <div class="form-row">
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="inputAddress2">name</label>
                                                <input type="text" class="form-control" id="inputAddress2" placeholder="Enter name"
                                                    {...register('name', {
                                                        required: true
                                                    })}
                                                />
                                                {
                                                    errors.name && <span className='text-danger'>faldan sogeli magaca</span>
                                                }
                                            </div >
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="inputAddress2">Age</label>
                                                <input type="number" class="form-control" id="inputAddress2" placeholder="Enter age"
                                                    {...register("age", {
                                                        required: true
                                                    })}
                                                />
                                                {
                                                    errors.age && <span className='text-danger'>faldan sogeli Age</span>
                                                }
                                            </div >
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="inputAddress2">gender</label>
                                                <input type="text" class="form-control" id="inputAddress2" placeholder="Enter gender"
                                                    {...register("gender", {
                                                        required: true
                                                    })}
                                                />
                                                {
                                                    errors.gender && <span className='text-danger'>faldan sogeli gender</span>
                                                }
                                            </div >
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="inputAddress2">Phone</label>
                                                <input type="text" class="form-control" id="inputAddress2" placeholder="Enter phone"
                                                    {...register("phone", {
                                                        required: true
                                                    })}
                                                />
                                                {
                                                    errors.phone && <span className='text-danger'>faldan sogeli phone</span>
                                                }
                                            </div >
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label for="inputAddress2">address</label>
                                                <input type="text" class="form-control" id="inputAddress2" placeholder="Enter address"
                                                    {...register("address", {
                                                        required: true
                                                    })}
                                                />
                                                {
                                                    errors.address && <span className='text-danger'>faldan sogeli address</span>
                                                }
                                            </div >
                                        </div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6 w-full">
                                                <label for="inputAddress2">Date</label>
                                                <input type="date" class="form-control" id="inputAddress2" placeholder=""
                                                    {...register("date", {
                                                        required: true
                                                    })}
                                                />
                                                {
                                                    errors.date && <span className='text-danger'>faldan dooro date</span>
                                                }
                                            </div >
                                        </div>
                                    </div> */}
                                    {/* {<button type="save" class="btn btn-primary mt-4"
                                        style={{ marginLeft: '10px' }}>
                                        {edit ? "Update " : "Save"}
                                    </button>} */}

                                    
                                </form>
                                {/* <ToastContainer /> */}



                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    onClick={() => CloseTog()}


                                    className="btn btn-secondary waves-effect"
                                    data-dismiss="modal"
                                >
                                    Close
                                </button>
                                <button onClick={handleSubmit(selsave)} type="submit" className={`btn   ${edit ? `btn-success` : `btn-primary`}`}>{
                                    edit ? 'Update' : 'Save'
                                }</button>
                            </div>
                        </Modal>
                        <Row>
                            <Col className="col-12">
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col-10></Col-10>
                                        </Row>
                                        <CardTitle className="h4">Default Datatable </CardTitle>

                                        <Row>
                                            <Col className="col-10"></Col>
                                            <Col className="col-2">
                                                <Button onClick={() => tog_standard()} className="btn bg-primary ms-4 text-white mb-2">Add Patients</Button>
                                            </Col>
                                        </Row>
                                        <MDBDataTable responsive bordered data={data} />
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default Patients