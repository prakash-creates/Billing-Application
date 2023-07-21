import { Button, Col, Form, Row } from 'react-bootstrap';
import React from 'react';
import { useState, useRef } from 'react';
import './Homepage.css'
import logo from '../image/logo.png';
import { useForm } from 'react-hook-form';
import Sidebar from './Sidebar';
import ReactToPrint from 'react-to-print';
import {FaPlus} from 'react-icons/fa';
import { ToWords } from 'to-words';

function TableRows({ rows, tableRowRemove, onValUpdate, justForAmountField }) 
{
    return rows.map((rowsData, index) => {
        const { description, hsn_sac, quantity, rate, amount } = rowsData;
        return (
            <tr key={index}>
                <td>{index+1}</td>
                <td>
                    <input
                    type="text"
                    value={description}
                    onChange={(event) => onValUpdate(index, event)}
                    name="description"
                    className="form-control"
                    />
                </td>
                <td>
                    <input
                    type="number"
                    value={hsn_sac}
                    onChange={(event) => onValUpdate(index, event)}
                    name="hsn_sac"
                    className="form-control"
                    />
                </td>
                <td>
                    <input
                    type="number"
                    value={quantity}
                    onChange={(event) => onValUpdate(index, event)}
                    name="quantity"
                    className="form-control"
                    />
                </td>
                <td>
                    <input
                    type="number"
                    value={rate}
                    onChange={(event) => onValUpdate(index, event)}
                    name="rate"
                    className="form-control"
                    />
                </td>
                <td>
                    <input
                    type="hidden"
                    value={amount}
                    onBeforeInput={(event) => onValUpdate(index, event)}
                    name="amount"
                    className="form-control"
                    readOnly
                    />
                    <input
                    type="number"
                    value={amount}
                    name="amount"
                    className="form-control"
                    readOnly
                    />
                </td>
                <td>
                    <button
                    type='button'
                    className="btn btn-dark"
                    style={{border : '1px solid #999'}}
                    onClick={() => tableRowRemove(index)}
                    >
                    Delete Row
                    </button>
                </td>
            </tr>
        );
    });
}

const ComponentToPrint = React.forwardRef((props, ref) => {
    
        const billData = props.billData;

        const invoiceNumber = billData.invoiceNumber;
        const rows = billData.products;
        const cname = billData.name;
        const cnumber = billData.contact;
        const caddressOne = billData.addressOne;
        const caddressTwo = billData.addressTwo;
        const Payment = billData.payment;
        const cgst = billData.cgst;
        const sgst = billData.sgst;
        const gstin = billData.gstin;
        const totalAmount = billData.totalAmt;
        const today = (billData.today).split('-').reverse().join('-');
        const netPayableWords = billData.netPayableWords;
        const netPayable = billData.netPayable;

        const cgstAmt = (totalAmount*cgst)/100;
        const sgstAmt = (totalAmount*sgst)/100;

        

// style={{display : "none"}}

        
        

    return (
        <div style={{display : "none"}}>
            <div ref={ref}>
                
                <div class="invoice-box">
                    <table cellpadding="0" cellspacing="0">
                        <tr>
                            <td></td>
                            <td><span className='taxinvoicetop'><b>TAX INVOICE</b></span></td>
                        </tr>
                        <tr class="top">
                            <td colspan="4">
                                <table>
                                    <tr>
                                        <td class="title">
                                            <img src={logo} style={{"width" : "100%", "maxWidth" : "300px"}} />
                                        </td>
                                        <td>
                                            Invoice # : <b>{invoiceNumber}</b><br/><br />
                                            Date : <b>{today}</b>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr class="information">
                            <td colspan="4">
                                <table>
                                    <tr>
                                        <td style={{width : "50%"}}>
                                            Contact Info :<br />
                                            Mob. - <b>9472936336</b><br />
                                            Email - <b>roshnielectric07@gmail.com</b><br/>
                                            GSTIN / UIN - <b>10AFAPC5329P1ZP</b>
                                        </td>
                                        <td>
                                            <b style={{textTransform : "capitalize"}}>{cname}</b><br />
                                            Mob No. - <b>{cnumber}</b><br/>
                                            <p>
                                            {caddressOne}<br/>
                                            {caddressTwo}
                                            </p>
                                            GSTIN - <b>{gstin}</b>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <tr class="heading">
                            <td>Payment Method</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr class="details">
                            <td>{Payment}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr class="heading">
                            <td>Particulars</td>
                            <td>Rate</td>
                            <td>Quantity</td>
                            <td>Total Price</td>
                        </tr>

                        {rows?.map((item, i) => (
                            <tr class="item" key={i}>
                                <td>{item.description}</td>
                                <td>&#8377; {item.rate}</td>
                                <td>{item.quantity}</td>
                                <td>&#8377; {item.amount}</td>
                            </tr>

                        ))}
                        

                        <tr class="total">
                            <td></td>
                            <td></td>
                            <td style={{textAlign : "right"}}>Total (Before Tax): </td>
                            <td>&#8377; {Number(totalAmount).toFixed(2)}</td>
                        </tr>

                        <tr class="total">
                            <td></td>
                            <td></td>
                            <td style={{textAlign : "right"}}>CGST ({cgst} &#x25;) : </td>
                            <td>&#8377; {cgstAmt}</td>
                        </tr>

                        <tr class="total">
                            <td></td>
                            <td></td>
                            <td style={{textAlign : "right"}}>SGST ({sgst} &#x25;) : </td>
                            <td>&#8377; {sgstAmt}</td>
                        </tr>

                        <tr class="heading">
                            <td></td>
                            <td></td>
                            <td style={{textAlign : "right"}}>Total (After Tax): </td>
                            <td>&#8377; {Number(netPayable).toFixed(2)}</td>
                        </tr>

                        <tr class="details">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr class="heading">
                            <td>Net Payable (in words):</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr class="details">
                            <td colSpan={4} style={{textAlign : "left"}}> {netPayableWords}</td>
                        </tr>

                        <tr class="heading">
                            <td>Seller's Bank Account Details : &nbsp;&nbsp;&nbsp;</td>
                            <td></td>
                            <td></td>
                            <td>For Roshni Electric</td>
                        </tr>

                        

                        <tr>
                            <td>Bank Name : </td>
                            <td className='bank-detail'>Indian Overseas Bank</td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>Account Number : </td>
                            <td className='bank-detail'>237902000000120</td>
                            <td></td>
                            <td></td>
                        </tr>

                        <tr>
                            <td>IFSC Code : </td>
                            <td className='bank-detail'>IOBA0002379</td>
                            <td></td>
                            <td></td>
                        </tr>

                        

                        <tr>
                            <td></td>
                            <td></td>
                            <td colSpan={2} style={{textAlign : "center"}}>Authorised Signatory<br/><b>(Roshni Electric)</b></td>
                        </tr>
                        
                    </table>
                </div>
            </div>
        </div>
        
    );
});

export default function Neworder()
{

    const componentRef = useRef();

    var todayy = new Date();
    todayy = todayy.toISOString().substring(0,10);
    
    // var y = today.getFullYear();
    // var d = today.getDate();
    // var m = today.getMonth() + 1;
    // var h = today.getHours();
    // var sec = today.getSeconds();
    // var min = today.getMinutes();
    
    // var invoiceNumber = '0' + m + y + d + h + min + sec ;
    
    // const dd = ("0" + (todayy.getDate())).slice(-2);
    // const mm = todayy.toString().split(' ')[1];
    // const yyyy = todayy.getFullYear();
    // todayy = dd + '-' + mm + ' ' + yyyy ;
    //console.log(todayy);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const[cname, setName] = useState();
    const[cnumber, setNumber] = useState();
    const[caddressOne, setAddressOne] = useState("Address");
    const[caddressTwo, setAddressTwo] = useState("Begusarai, Bihar");
    const[gstin, setGstin] = useState("0");
    const[invoiceNumber, setInvoiceNumber] = useState();
    const[Payment, setPayment] = useState("Cash");
    const[today, setToday] = useState(todayy);
    const[cgst, setCgst] = useState(9);
    const[sgst, setSgst] = useState(9);
    const[totalAmount, setTotalAmt] = useState(0);
    const[billDatas, setBillData] = useState({});

    const calculateTotalAmt = (arr) => {
        var res = arr.map(jsn => jsn.amount).reduce((acc, amt) => acc + amt);
        return res;
    }

    //const[rowNumber, setRowNumber] = useState(-1); // to set the index of the last added row as current
    //var totalAmount = 0;

    const [rows, initRow] = useState([]);

    const billData = {};

    const addRowTable = () => {
        
        const data = {
        description : "",
        hsn_sac : "",
        quantity : "",
        rate : "",
        amount : "0",
        };
        initRow([...rows, data]);
        setTotalAmt(calculateTotalAmt(rows));
    };
    const tableRowRemove = (index) => {
        const dataRow = [...rows];
        dataRow.splice(index, 1);
        initRow(dataRow);
        var totl = calculateTotalAmt(rows);
        setTotalAmt(totl);
    };
    const onValUpdate = (i, event) => {
        const { name, value } = event.target;
        const data = [...rows];
        data[i][name] = value;
        data[i]['amount'] = data[i]['rate'] * data[i]['quantity'];
        initRow(data);
    };
    const justForAmountField = (i, value) => {
        console.log("here");
        const data = [...rows];
        data[i]['amount'] = value;
    }

    const onFormSubmit = (productObj) => {
        var abctotal = calculateTotalAmt(rows);
        console.log("Total : " + abctotal);
        setTotalAmt(abctotal);
        console.log(calculateTotalAmt(rows)); // shows the total amount of all products
        console.log(rows);
        console.log(billData);

        const netPayable = ((abctotal*cgst)/100) + ((abctotal*sgst)/100) + abctotal;
        const toWords = new ToWords();
        const words = toWords.convert(netPayable, { currency: true });

        billData.products = rows;
        billData.name = cname;
        billData.contact = cnumber;
        billData.addressOne = caddressOne;
        billData.addressTwo = caddressTwo;
        billData.payment = Payment;
        billData.cgst = cgst;
        billData.sgst = sgst;
        billData.gstin = gstin;
        billData.totalAmt = abctotal;
        billData.invoiceNumber = invoiceNumber;
        billData.today = today;
        billData.netPayable = netPayable;
        billData.netPayableWords = words;
        setBillData(billData);
        console.log(billData);

        
        
    }

    //console.log(billDatas);
    

    return(
        <>
        <div className='invoice-main'>
            <Sidebar/>
            <div className='text-center invoice-base'>
                <p className = "page-heading display-3">New Tax invoice</p>
                <div className='form-section align-items-center justify-content-center'>
                    <form>
                        <hr/>
                        <p className='text-center' style={{fontSize : "2em", fontFamily : "monospace"}}>Bill and GST Details</p>
                        <hr style={{marginBottom : "20px"}}/>
                        <Row style={{position : "relative", marginBottom : "20px"}}>
                            <Col className="vertical-line-after">
                                <Row className='mb-3'>
                                    <Form.Label><span className='form-label-text display-6' style={{fontFamily : "cursive"}}><b><u>Roshni Electric</u></b></span></Form.Label>
                                    <Form.Label><span className='form-label-text'>Kachahari Road, Near Ambedkar Chowk,<br/>Begusarai, Bihar (PIN - 851101)</span></Form.Label>
                                    
                                </Row>
                            </Col>
                            <Col>
                                <Row className='mb-1 mt-3'>
                                    <Form.Label><span className='form-label-text'>GSTIN / UIN : <b>10AFAPC5329P1ZP</b> </span></Form.Label>
                                    <Form.Label><span className='form-label-text'>Contact - 8986913840, 9472936336</span></Form.Label>
                                </Row>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col>
                                <Row className='mb-3'>
                                    <Form.Label column><span className='form-label-text'>CGST : </span></Form.Label>
                                    <Col>
                                        <input type='text' placeholder="CGST" onChange={(event) => setCgst(event.target.value)}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row className='mb-3'>
                                    <Form.Label column><span className='form-label-text'>SGST : </span></Form.Label>
                                    <Col>
                                        <input type='text' placeholder="SGST" onChange={(event) => setSgst(event.target.value)}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row className='mb-3'>
                                    <Form.Label column><span className='form-label-text'>Invoice No. : </span></Form.Label>
                                    <Col>
                                        <input type='number' placeholder="Invoice Number" onChange={(event) => setInvoiceNumber(event.target.value)}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row className='mb-3'>
                                    <Form.Label column><span className='form-label-text'>Billing Date : </span></Form.Label>
                                    <Col>
                                        <input type='date' placeholder="Bill Date" onChange={(event) => setToday(event.target.value)}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <hr/>
                        <p className='text-center' style={{fontSize : "2em", fontFamily : "monospace"}}>Customer's Details</p>
                        <hr style={{marginBottom : "20px"}}/>
                        <Row>
                            <Col>
                                <Row className='mb-3'>
                                    <Form.Label column><span className='form-label-text'>Name</span></Form.Label>
                                <Col>
                                    <input type='text' placeholder="Customer Name" onChange={(event) => setName(event.target.value)}/>
                                </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row className='mb-3'>
                                    <Form.Label column><span className='form-label-text'>Contact Number</span></Form.Label>
                                <Col>
                                    <input type='number' placeholder="Customer Contact" onChange={(event) => setNumber(event.target.value)}/>
                                </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Row className='mb-3'>
                                    <Form.Label column><span className='form-label-text'>Address Line 1</span></Form.Label>
                                    <Col>
                                        <textarea placeholder="Customer Address" maxLength={40} onChange={(event) => setAddressOne(event.target.value)}/>
                                        
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Form.Label column><span className='form-label-text'>GSTIN / UIN</span></Form.Label>
                                    <Col>
                                        <input type='text' placeholder="GSTIN / UIN" onChange={(event) => setGstin(event.target.value)}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col>
                                <Row className='mb-3'>
                                    <Form.Label column><span className='form-label-text'>Address Line 2</span></Form.Label>
                                    <Col>
                                        <textarea placeholder="Address Line 2" maxLength={40} onChange={(event) => setAddressTwo(event.target.value)}/>
                                        
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Form.Label column><span className='form-label-text'>Mode of Payment</span></Form.Label>
                                    <Col>
                                        <input type='text' placeholder="Mode of Payment" onChange={(event) => setPayment(event.target.value)}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <hr/>
                        <p className='text-center' style={{fontSize : "2em", fontFamily : "monospace"}}>Product Description</p>
                        <hr style={{marginBottom : "20px"}}/>
                        <div className="row">
                            <table className="table table-dark table-stripped">
                                <thead className='thead-light'>
                                <tr>
                                    <th>Sl No.</th>
                                    <th>Description of Goods</th>
                                    <th>HSN / SAC</th>
                                    <th>Quantity</th>
                                    <th>Rate per unit</th>
                                    <th>Amount</th>
                                    <th><button className="btn btn-outline-primary" type='button' onClick={addRowTable} ><FaPlus/></button></th>
                                </tr>
                                </thead>
                            <tbody>
                                <TableRows rows={rows} tableRowRemove={tableRowRemove} onValUpdate={onValUpdate} justForAmountField={justForAmountField} />
                                <tr>
                                    <td></td>  <td></td>  <td></td>  <td></td>  <td></td>  <td colSpan={2} style={{textAlign : "center"}}>Total Amount : &#8377; {totalAmount}</td>  
                                </tr>
                                <tr>
                                    <td></td>  <td></td>  <td></td>  <td></td>  <td></td>  <td colSpan={2}><Button className='w-100' variant='outline-success' type='button' onClick={onFormSubmit}>Generate Bill</Button></td>  
                                </tr>
                            </tbody> 
                            </table>
                        </div>
                    </form>
                </div>
                {billData.Payment}

                <div>
                    <ReactToPrint
                        trigger={() => <button className='btn btn-success btn-lg mb-3'>Print the bill</button>}
                        content={() => componentRef.current}
                    />
                    <ComponentToPrint billData={billDatas} ref={componentRef} />
                </div>

            </div>
        </div>
        </>
    )
}

