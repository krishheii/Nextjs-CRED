import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteUser, editUser } from '../../actions';
import {
    Row,
    Col,
    Layout,
    Table,
    Icon,
    Popconfirm,
    Form,
    Input,
    InputNumber
} from 'antd';

const { Content } = Layout;
const EditableContext = React.createContext();

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    type: dataIndex === 'email' ? 'email' : '',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                        children
                    )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class UserLists extends Component {

    constructor(props) {
        super(props);
        this.state = { editingKey: '' };
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                editable: true,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                editable: true,
            },
            {
                title: 'Edit',
                dataIndex: '',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
                            <EditableContext.Consumer>
                                {form => (
                                    <a
                                        onClick={() => this.save(form, record.key)}
                                        style={{ marginRight: 8 }}
                                    >
                                        Save
                            </a>
                                )}
                            </EditableContext.Consumer>
                            <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                                <a>Cancel</a>
                            </Popconfirm>
                        </span>
                    ) : (
                            <a disabled={editingKey !== ''} style={{ color: 'black' }} onClick={() => this.edit(record.key)}>
                                <Icon type="edit" />
                            </a>
                        );
                },
            },
            {
                title: 'Delete',
                dataIndex: '',
                render: (e) => <a
                    style={{ color: 'black' }}
                    onClick={() => this.props.deleteUser(e.key)}
                >
                    <Icon type="delete" />

                </a>

            }
        ];
    }

    renderList() {
        return this.props.user.map((user, index) => {
            return (
                {
                    key: index,
                    name: user.name,
                    email: user.email,
                }
            );
        });
    }

    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            this.props.editUser(row, key)
            this.setState({ editingKey: '' });
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'email' ? 'email' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (<div>
            <Content style={{ padding: '30px 50px' }}>
                <Row>
                    <Col span={12}><div style={user}> {`${this.renderList().length} User`} </div></Col>
                    <Col span={12}>
                        <Link style={addUserLink} to="/user/usercreate" >
                            Add User
                        </Link>
                    </Col>
                </Row>
                <Row style={{ marginTop: '3%' }}>
                    <EditableContext.Provider value={this.props.form}>
                        <Table
                            components={components}
                            columns={columns}
                            rowClassName="editable-row"
                            dataSource={this.renderList()}
                            pagination={{ pageSize: 5 }} />
                    </EditableContext.Provider>
                </Row>
            </Content>
        </div>);
    }
}

const UserList = Form.create()(UserLists);
const user = {
    color: 'black',
    fontSize: '20px',
}
const addUserLink = {
    background: 'black',
    color: 'white',
    padding: '5px 10%',
    float: 'right'
}


const mapStateToProps = (state) => {
    return { user: state.user }
}

export default connect(mapStateToProps, { deleteUser, editUser })(UserList);