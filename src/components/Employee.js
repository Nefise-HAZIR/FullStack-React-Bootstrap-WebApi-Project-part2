import React, { Component } from 'react';
import {  Table } from 'react-bootstrap';
import { Button,ButtonGroup  } from 'react-bootstrap';
import { AddEmpModal } from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal'

export class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emps: [],
            addModalShow:false,
            editModalShow:false
        }
    }
    componentDidMount() {
        this.refresh();
    }
    componentDidUpdate(){
        this.refresh();
    }
    refresh() {
        fetch('http://localhost:53301/api/employee', { headers: { "Access-Control-Allow-Origin": "http://localhost:53301/api/employee" }, redirect: 'follow' })
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    emps:data
                })
            });
    }
    DeleteEmp(empid){
        if(window.confirm('are you sure')){
            fetch('http://localhost:53301/api/employee/'+empid,{method:'DELETE',headers:{'Accept':'application/json','Content-Type':'application/json'}})
        }
    }

    render() {
        const { emps,empid,empname,empdep,empmail } = this.state;
        let onHide=()=>{
            this.setState({
                addModalShow:false
            })
        }
        let editModalClose=()=>{
            this.setState({
                editModalShow:false
            })
        }
        return (
            <div>
                <Table className='mt-4' striped bordered hover size='sm'>
                <thead>
                    <tr>
                        <th>EmployeeID</th>
                        <th>EmployeeName</th>
                        <th>Mail</th>
                        <th>Department</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        emps.map(emp =>
                            <tr>
                                <td>{emp.EmployeeID}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.MailID}</td>
                                <td>{emp.Department}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button onClick={()=>{this.setState({
                                            editModalShow:true,
                                            empid:emp.EmployeeID,
                                            empname:emp.EmployeeName,
                                            empdep:emp.Department,
                                            empmail:emp.MailID
                                        })}}>
                                        Edit
                                        </Button>
                                        <Button variant='danger' onClick={()=>{this.DeleteEmp(emp.EmployeeID)}}>Delete</Button>
                                        <EditEmpModal show={this.state.editModalShow} onHide={editModalClose} empid={empid} empname={empname} empdep={empdep} empmail={empmail} />
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                    }

                </tbody>
            </Table> 
            <ButtonGroup>
                <Button onClick={()=>this.setState({
                    addModalShow:true
                })}>Add Employee</Button>
            </ButtonGroup>
            <AddEmpModal show={this.state.addModalShow} onHide={onHide} />
            </div>
           

        );
    }
}
