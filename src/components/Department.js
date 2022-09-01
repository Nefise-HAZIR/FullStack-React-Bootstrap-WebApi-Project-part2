import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { AddDepModal } from './AddDepModal';
import { Button,ButtonGroup  } from 'react-bootstrap';
import { EditDepModal } from './EditDepModal';



export class Department extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deps: [],
            addModalShow:false,
            editModalShow:false,
        };
    }
    componentDidMount() {
        this.refleshList();
    }
    componentDidUpdate(){
        this.refleshList();
    }



    refleshList() {
        fetch('http://localhost:53301/api/department', { headers: { "Access-Control-Allow-Origin": "http://localhost:53301/api/department" }, redirect: 'follow' })
            .then((response) => {
                console.log(response)
                if (!response.ok) {
                    throw Error('error')
                }
                return response.json()
            })
            .then((data) => {
                this.setState({
                    deps: data
                })
            })
            .catch(err => {
                console.log(err.message);
            })

    }
    deleteDep(depid){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:53301/api/department/'+depid,{method:'DELETE',headers:{'Accept':'application/json','Content-Type':'application/json'}})

        }
    }
    render() {
        const { deps,depid,depname } = this.state;
        let addModalClose=()=>{
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
                            <th>DepartmentID</th>
                            <th>DepartmentName</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            deps.map(dep =>
                                <tr key={dep.DepartmentID}>
                                    <td>{dep.DepartmentID}</td>
                                    <td>{dep.DepartmentName}</td>
                                    <td>
                                        <ButtonGroup >
                                            <Button onClick={()=>this.setState({
                                             editModalShow:true,
                                             depid:dep.DepartmentID,
                                             depname:dep.DepartmentName
                                        })}>Edit</Button>
                                        <Button  variant='danger' onClick={()=>this.deleteDep(dep.DepartmentID)}>Delete</Button>
                                        <EditDepModal  show={this.state.editModalShow} onHide={editModalClose} depid={depid} depName={depname} />
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
                    })}>Add Department</Button>
                </ButtonGroup>
                <AddDepModal show={this.state.addModalShow} onHide={addModalClose} />
            </div>

        );
    }
}

