import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddEmpModal extends Component {
    handleSubmit(e){
        e.preventDefault();
        fetch('http://localhost:53301/api/employee',{method:'POST',headers:{"Access-Control-Allow-Origin": "http://localhost:53301/api/employee",'Accept':'application/json','Content-Type':'application/json'},
        body:JSON.stringify({
            EmployeeID:null,
            EmployeeName:e.target.EmployeeName.value,
            Department:e.target.Department.value,
            MailID:e.target.MailID.value
        })
    })
    .then((res)=>res.JSON())
    .then((result)=>{
          
    })
    .catch(err=>console.log(err));
    }
    render() {
        return (
            <div className='container'>
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>
                                            Employee name
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="EmployeeName"
                                            required
                                            placeholder='EmployeeName'
                                        />
                                        <Form.Label>
                                            Department
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Department"
                                            required
                                            placeholder='Department'
                                        />
                                        <Form.Label>
                                            MailID
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="MailID"
                                            required
                                            placeholder='MailID'
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

