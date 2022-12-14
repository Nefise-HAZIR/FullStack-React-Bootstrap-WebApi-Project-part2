import React, { Component } from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';
import  { Snackbar } from '@mui/material';
import {IconButton} from '@mui/material'

export class AddDepModal extends Component {
    constructor(props){
        super(props);
        this.state={
            snackbaropen:false,
            snackbarmsg:''
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    
    snackbarClose=()=>{
        this.setState({
            snackbaropen:false
        });
    }

    handleSubmit(e){
        e.preventDefault();
        fetch('http://localhost:53301/api/department',{method:'POST',headers:{"Access-Control-Allow-Origin": "http://localhost:53301/api/department",'Accept':'application/json','Content-Type':'application/json'},
        body:JSON.stringify({
            DepartmentID:null,
            DepartmentName:e.target.DepartmentName.value
        })
    })
        .then((res)=>res.JSON())
        .then((result)=>{
            this.setState({
                snackbaropen:true,
                snackbarmsg:result              //'succesfull' böylede failed bastırıyor
            })
        }
        )
        .catch(err => {
            this.setState({
                snackbaropen:true,
                snackbarmsg:'failed'
            })
        })
    }
    render() {
        return (
            <div className='container'>
                <Snackbar 
                  anchorOrigin={{vertical:'center',horizontal:'center'}}
                  open={this.state.snackbaropen}
                  autoHideDuration={3000}
                  onClose={this.snackbarClose}
                  message={<span id='messageId'>{this.state.snackbarmsg}</span>}
                  action={[<IconButton key="close" aria-label="close" color="inherit" onClick={this.snackbarClose}>
                    x
                  </IconButton>]}
                />
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Department
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       
                         <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                     <Form.Group>
                                        <Form.Label>
                                            Department name
                                        </Form.Label>
                                        <Form.Control
                                        type="text"
                                        name="DepartmentName"
                                        required
                                        placeholder='DepartmentName'
                                        />
                                     </Form.Group>
                                     <Form.Group>
                                        <Button variant='primary' type='submit'>
                                            Add
                                        </Button>
                                     </Form.Group>
                                </Form>
                            </Col>
                         </Row>
                        
                       
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='danger' onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

 