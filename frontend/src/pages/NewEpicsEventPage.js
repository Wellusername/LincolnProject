import './NewEpicsEventPage.css';
import React from 'react';
import { useState, useEffect } from 'react';

import { Grid, Button } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';

import { timezones } from '../consonants/Timezones';
import { 
    EventType1,
    EventType2, 
    Action,
    s4tType,
    quantityType
} from '../consonants/EpicsEventConsonants';

import QrCodeScanner from "../layouts/QrCodeScanner";
import { decodeUri } from "../utils/connectBackend";


function NewEpicsEventPage() {
    const [scanResult, setScanResult] = useState();
    const [scan, setScan] = useState(false);
    const [decodedResult, setDecodedResult] = useState({});
    
    const [eventType1, setEventType1] = useState(Object.values(EventType1)[0]);
    const [eventType2, setEventType2] = useState(Object.values(EventType2)[0]);
    const [action , setAction] = useState(Object.values(Action)[0]);
    const [eventId, setEventId] = useState('');

    const [declarationTime, setDeclarationTime] = useState('');
    const [declarationTimeZone, setDeclarationTimeZone] = useState(timezones[timezones.length - 1]);
    const [reason, setReason] = useState('');
    const [correctiveEventIds, setCorrectiveEventIds] = useState([]);

    const [eventTime, setEventTime] = useState('');
    const [eventTimeTimeZone, setEventTimeTimeZone] = useState(timezones[timezones.length - 1]);
    const [recordTime, setRecordTime] = useState('');
    const [recordTimeTimeZone, setRecordTimeTimeZone] = useState(timezones[timezones.length - 1]);

    const [ePCs, setEPCs] = useState([]);
    const [ePCsOutput, setEPCsOutput] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [quantitiesOutput, setQuantitiesOutput] = useState([]);
    const [quantity, setQuantity] = useState({type: 'Quantity', s4tType: 'null', quantity: ''});
    const [parentId, setParentId] = useState({type: 'Parent ID', s4tType: 'null'});
    const [xformId, setXformId] = useState('');

    const [readPoint, setReadPoint] = useState({type: 'Read Point', s4tType: 'null'});
    const [businessLocation, setBusinessLocation] = useState({type: 'Business Location', s4tType: 'null'});

    const [businessStep, setBusinessStep] = useState('');
    const [disposition, setDisposition] = useState('');
    const [bizTransactions, setBizTransactions] = useState([]);
    const [sources, setSources] = useState([]);
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        if (eventType1) {
            setEPCs([]);
            setEPCsOutput([]);
            setQuantities([]);
            setQuantitiesOutput([]);
            setQuantity({type: 'Quantity', s4tType: 'null', quantity: ''});
            setParentId({type: 'Parent ID', s4tType: 'null'});
            setXformId('');
        }
    }, [eventType1]);

    useEffect(() => {
        if (scanResult && scanResult !== "") {
          decodeUri(scanResult).then((res) => {
            console.log(res);
            if (res.success) {
              setDecodedResult(res.info);
              setScan(false);
            } else {
              console.log(res.message);
            }
          });
        }
      }, [scanResult]);

    const handleScanResult = (val) => {
        setScanResult(val);
    };

    const handleScanButton = () => {
        setScan(true);
        setDecodedResult({});
        setScanResult("");
    };

    const displayButton = () => {
        console.log(scan);
        if (!scan) {
          return (
            <Button
              variant="outlined"
              color="primary"
              style={{margin: 'auto auto 2rem auto', padding: '1rem 2rem'}}
              onClick={() => handleScanButton()}
            >
              Scan
            </Button>
          );
        }
    };

    const save = () => {
        let object = {
            eventType1: eventType1,
            eventType2: eventType2,
            eventId: eventId,

            declarationTime: declarationTime,
            declarationTimeZone: declarationTimeZone,
            reason: reason,
            correctiveEventIds: correctiveEventIds,

            eventTime: eventTime,
            eventTimeTimeZone: eventTimeTimeZone,
            recordTime: recordTime,
            recordTimeTimeZone: recordTimeTimeZone,

            readPoint: readPoint,
            businessLocation: businessLocation,

            businessStep: businessStep,
            disposition: disposition,
            bizTransactions: bizTransactions,
        };

        if (eventType1 === EventType1.objectEvent) {
            object = {
                ...object,
                action: action,
                ePCs: ePCs,
                quantities: quantities,
                sources: sources,
                destinations: destinations
            }
        } else if (eventType1 === EventType1.agrigationEvent) {
            object = {
                ...object,
                action: action,
                parentId: parentId,
                childEPCs: ePCs,
                childQuantities: quantities,
                sources: sources,
                destinations: destinations
            }
        } else if (eventType1 === EventType1.transactionEvent) {
            object = {
                ...object,
                action: action,
                parentId: parentId,
                ePCs: ePCs,
                quantities: quantities,
                sources: sources,
                destinations: destinations
            }
        } else if (eventType1 === EventType1.transformationEvent) {
            object = {
                ...object,
                xformId: xformId,
                inputEPCs: ePCs,
                inputQuantities: quantities,
                outputEPCs: ePCsOutput,
                outputQuantities: quantitiesOutput
            }
        } else if (eventType1 === EventType1.quantityEvent) {
            object = {
                ...object,
                quantities: quantities
            }
        }

        console.log(object)
    }

    const cancel = () => {
        setEventType1(Object.values(EventType1)[0]);
        setEventType2(Object.values(EventType2)[0]);
        setAction(Object.values(Action)[0]);
        setEventId('');

        setDeclarationTime('');
        setDeclarationTimeZone(timezones[timezones.length - 1]);
        setReason('');
        setCorrectiveEventIds([]);

        setEventTime('');
        setEventTimeTimeZone(timezones[timezones.length - 1]);
        setRecordTime('');
        setRecordTimeTimeZone(timezones[timezones.length - 1]);

        setEPCs([]);
        setEPCsOutput([]);
        setQuantities([]);
        setQuantitiesOutput([]);
        setQuantity({});
        setParentId({type: 'Parent ID', s4tType: 'null'});
        setXformId('');

        setReadPoint({type: 'Read Point', s4tType: 'null'});
        setBusinessLocation({type: 'Business Location', s4tType: 'null'});

        setBusinessStep('');
        setDisposition('');
        setBizTransactions([]);
        setSources([]);
        setDestinations([]);
    }

    const generate = () => {
        const uuid = uuidv4();
        const value = `urn:uuid:${uuid}`;
        setEventId(value);
    }

    const onCorrectiveEventIdsAddAnother = () => {
        const newCorrectiveEventIds = [...correctiveEventIds];
        newCorrectiveEventIds.push('');
        setCorrectiveEventIds(newCorrectiveEventIds);
    }

    const onChangeCorrectiveEventIdsAddAnother = (event, index) => {
        const newCorrectiveEventIds = [...correctiveEventIds];
        newCorrectiveEventIds[index] = event.target.value;
        setCorrectiveEventIds(newCorrectiveEventIds);
    }

    const onDeleteCorrectiveEventIds = (index) => {
        const newCorrectiveEventIds = [...correctiveEventIds];
        newCorrectiveEventIds.splice(index, 1);
        setCorrectiveEventIds(newCorrectiveEventIds);
    }

    const onEPCsAddAnother = (type) => {
        if (type === 'EPCs') {
            const newEPCs = [...ePCs];
            newEPCs.push({type: type, s4tType: null});
            setEPCs(newEPCs);
        } else {
            const newEPCs = [...ePCsOutput];
            newEPCs.push({type: type, s4tType: null});
            setEPCsOutput(newEPCs);
        }
    }

    const onQuantitiesAddAnother = (type) => {
        if (type === 'Quantities') {
            const newQuantities = [...quantities];
            newQuantities.push({
                type: type, 
                s4tType: null, 
                quantityType: Object.values(quantityType)[0],
                quantity: '',
                uom: ''
            });
            setQuantities(newQuantities);
        } else {
            const newQuantities = [...quantitiesOutput];
            newQuantities.push({
                type: type, 
                s4tType: null, 
                quantityType: Object.values(quantityType)[0],
                quantity: '',
                uom: ''
            });
            setQuantitiesOutput(newQuantities);
        }
    }

    const onS4tTypeSelectChangeEPCs = (event, value, index) => {
        if (value.type === 'EPCs') {
            const content = [...ePCs];
            const object = returnS4tTypeBlankObject(event.target.value);
            const newObj = {type: content[index].type, s4tType: event.target.value, ...object};
            content[index] = newObj;
            setEPCs(content);
        } else {
            const content = [...ePCsOutput];
            const object = returnS4tTypeBlankObject(event.target.value);
            const newObj = {type: content[index].type, s4tType: event.target.value, ...object};
            content[index] = newObj;
            setEPCsOutput(content);
        }
    }

    const onS4tTypeSelectChangeQty = (event, value, index) => {
        if (value.type === 'Quantities') {
            const content = [...quantities];
            const object = returnS4tTypeBlankObject(event.target.value);
            const newObj = {
                type: content[index].type, 
                s4tType: event.target.value, 
                quantityType: content[index].quantityType,
                quantity: content[index].quantity,
                uom: content[index].uom,
                ...object
            };
            content[index] = newObj;
            setQuantities(content);
        } else if (value.type === 'Quantity') {
            let content = {...quantity};
            const object = returnS4tTypeBlankObject(event.target.value);
            const newObj = {
                type: content.type, 
                s4tType: event.target.value,
                quantity: content.quantity,
                ...object
            };
            content = newObj;
            setQuantity(content);
        } else {
            const content = [...quantitiesOutput];
            const object = returnS4tTypeBlankObject(event.target.value);
            const newObj = {
                type: content[index].type, 
                s4tType: event.target.value, 
                quantityType: content[index].quantityType,
                quantity: content[index].quantity,
                uom: content[index].uom,
                ...object
            };
            content[index] = newObj;
            setQuantitiesOutput(content);
        }
    }

    const onS4tTypeSelectChangeParentId = (event) => {
        let content = {...parentId};
        const object = returnS4tTypeBlankObject(event.target.value);
        const newObj = {type: content.type, s4tType: event.target.value, ...object};
        content = newObj;
        setParentId(content);
    }

    const onS4tTypeSelectChangeReadPoint = (event) => {
        let content = {...readPoint};
        const object = returnS4tTypeBlankObject(event.target.value);
        const newObj = {type: content.type, s4tType: event.target.value, ...object};
        content = newObj;
        setReadPoint(content);
    }

    const onS4tTypeSelectChangeBusinessLocation = (event) => {
        let content = {...businessLocation};
        const object = returnS4tTypeBlankObject(event.target.value);
        const newObj = {type: content.type, s4tType: event.target.value, ...object};
        content = newObj;
        setBusinessLocation(content);
    }

    const onQuantityTypeChange = (event, value, index) => {
        if (value.type === 'Quantities') {
            let content = [...quantities];
            const newObjQty = {
                ...content[index], 
                quantityType: event.target.value,
            };
            content[index] = newObjQty;
            setQuantities(content);
        } else {
            let content = [...quantitiesOutput];
            const newObjQty = {
                ...content[index], 
                quantityType: event.target.value,
            };
            content[index] = newObjQty;
            setQuantitiesOutput(content);
        }
    }

    const onQuantityChange = (event, value, index) => {
        if (value.type === 'Quantities') {
            let content = [...quantities];
            const newObjQty = {
                ...content[index], 
                quantity: event.target.value,
            };
            content[index] = newObjQty;
            setQuantities(content);
        } else if (value.type === 'Quantity') {
            let content = {...quantity};
            const newObjQty = {
                ...content, 
                quantity: event.target.value,
            };
            content = newObjQty;
            setQuantity(content);
        } else {
            let content = [...quantitiesOutput];
            const newObjQty = {
                ...content[index], 
                quantity: event.target.value,
            };
            content[index] = newObjQty;
            setQuantitiesOutput(content);
        }
    }

    const onUOMChange = (event, value, index) => {
        if (value.type === 'Quantities') {
            let content = [...quantities];
            const newObjQty = {
                ...content[index], 
                uom: event.target.value,
            };
            content[index] = newObjQty;
            setQuantities(content);
        } else {
            let content = [...quantitiesOutput];
            const newObjQty = {
                ...content[index], 
                uom: event.target.value,
            };
            content[index] = newObjQty;
            setQuantitiesOutput(content);
        }
    }

    const returnS4tTypeBlankObject = (type) => {
        switch (type) {
            case s4tType.sgtin:
                return {
                    Al01: '',
                    Al02: '',
                    GS1CompanyPrefix: null
                }
            case s4tType.sscc:
                return {
                    Al00: '',
                    GS1CompanyPrefix: null
                }
            case s4tType.grai:
                return {
                    Al8003: '',
                    GS1CompanyPrefix: null
                }
            case s4tType.giai:
                return {
                    Al8004: '',
                    GS1CompanyPrefix: null
                }
            case s4tType.gsrn:
                return {
                    Al8018: '',
                    GS1CompanyPrefix: null
                }
            case s4tType.gsrnp:
                return {
                    Al8017: '',
                    GS1CompanyPrefix: null
                }
            case s4tType.gdti:
                return {
                    Al253: '',
                    GS1CompanyPrefix: null
                }
            case s4tType.sgcn:
                return {
                    Al255: '',
                    GS1CompanyPrefix: null
                }
            case s4tType.cpi:
                return {
                    Al8010: '',
                    Al8011: '',
                    GS1CompanyPrefix: null
                }
            case s4tType.ginc:
                return {
                    Al401: '',
                    GS1CompanyPrefix: null
                }
            case s4tType.gsin:
                return {
                    Al402: '',
                    GS1CompanyPrefix: null
                }
            case s4tType.itip:
                return {
                    Al8006: '',
                    Al21: '',
                    GS1CompanyPrefix: null
                }
            case s4tType.upui:
                return {
                    Al01: '',
                    Al235: '',
                    GS1CompanyPrefix: null
                }
            case s4tType.gid:
                return {
                    Mgr: '',
                    Class: '',
                    Ser: null
                }
            case s4tType.usdod:
                return {
                    'CAGE/DoDAAC': '',
                    Serial: ''
                }
            case s4tType.adi:
                return {
                    'CAGE/DoDAAC': '',
                    PNO: '',
                    SER: ''
                }
            case s4tType.bic:
                return {
                    BIC: ''
                }
            case s4tType.imovn:
                return {
                    IMOVN: ''
                }
            case s4tType.uri:
                return {
                    URI: ''
                }
            case s4tType.lgtin:
                return {
                    Al01: '',
                    Al10: '',
                    GS1CompanyPrefix: null
                }
            case s4tType.sgln:
                return {
                    Al414: '',
                    Al254: '',
                    GS1CompanyPrefix: null
                }
        }
    }

    const onS4tTypeDelete = (value, index) => {
        let content = [];

        if (value.type === 'EPCs') {
            content = [...ePCs];
            content.splice(index, 1);
            setEPCs(content);
        } else if (value.type === 'EPCs Output') {
            content = [...ePCsOutput];
            content.splice(index, 1);
            setEPCsOutput(content);
        } else if (value.type === 'Quantities') {
            content = [...quantities];
            content.splice(index, 1);
            setQuantities(content);
        } else if (value.type === 'Quantities Output') {
            content = [...quantitiesOutput];
            content.splice(index, 1);
            setQuantitiesOutput(content);
        }
    }

    const s4tTypeSelect = (value, index) => {
        switch (value.type) {
            case 'EPCs':
                return (
                    <div style={{display: 'flex'}}>
                        <select onChange={(e) => onS4tTypeSelectChangeEPCs(e, value, index)} value={value.s4tType}>
                            <option value="null">Choose...</option>
                            <optgroup label="GS1 Key">
                                <option value={s4tType.sgtin}>SGTIN (AI 01 + AI 21)</option>
                                <option value={s4tType.sscc}>SSCC (AI 00)</option>
                                <option value={s4tType.grai}>GRAI (AI 8003)</option>
                                <option value={s4tType.giai}>GIAI (AI 8004)</option>
                                <option value={s4tType.gsrn}>GSRN (AI 8018)</option>
                                <option value={s4tType.gsrnp}>GSRNP (AI 8017)</option>
                                <option value={s4tType.gdti}>GDTI (AI 253)</option>
                                <option value={s4tType.sgcn}>GCN (AI 255)</option>
                                <option value={s4tType.cpi}>CPI (AI 8010 + AI 8011)</option>
                                <option value={s4tType.ginc}>GINC (AI 401)</option>
                                <option value={s4tType.gsin}>GSIN (AI 402)</option>
                                <option value={s4tType.itip}>ITIP (AI 8006 + AI 21)</option>
                                <option value={s4tType.upui}>UPUI (AI 01 + AI 235)</option>
                            </optgroup>
                            <optgroup label="Other EPC Identifier">
                                <option value={s4tType.gid}>GID</option>
                                <option value={s4tType.usdod}>USDoD</option>
                                <option value={s4tType.adi}>ADI</option>
                                <option value={s4tType.bic}>BIC</option>
                                <option value={s4tType.imovn}>IMOVN</option>
                            </optgroup>
                            <optgroup label="Other">
                                <option value={s4tType.uri}>Enter a URI manually</option>
                            </optgroup>
                        </select>
                        {s4tTypeSelectContent(value, index)}
                        <button onClick={() => onS4tTypeDelete(value, index)} style={{backgroundColor: '#d9534f', marginLeft: '0.5rem'}}>DELETE</button>
                    </div>
                )
            case 'EPCs Output':
                return (
                    <div style={{display: 'flex'}}>
                        <select onChange={(e) => onS4tTypeSelectChangeEPCs(e, value, index)} value={value.s4tType}>
                            <option value="null">Choose...</option>
                            <optgroup label="GS1 Key">
                                <option value={s4tType.sgtin}>SGTIN (AI 01 + AI 21)</option>
                                <option value={s4tType.sscc}>SSCC (AI 00)</option>
                                <option value={s4tType.grai}>GRAI (AI 8003)</option>
                                <option value={s4tType.giai}>GIAI (AI 8004)</option>
                                <option value={s4tType.gsrn}>GSRN (AI 8018)</option>
                                <option value={s4tType.gsrnp}>GSRNP (AI 8017)</option>
                                <option value={s4tType.gdti}>GDTI (AI 253)</option>
                                <option value={s4tType.sgcn}>GCN (AI 255)</option>
                                <option value={s4tType.cpi}>CPI (AI 8010 + AI 8011)</option>
                                <option value={s4tType.ginc}>GINC (AI 401)</option>
                                <option value={s4tType.gsin}>GSIN (AI 402)</option>
                                <option value={s4tType.itip}>ITIP (AI 8006 + AI 21)</option>
                                <option value={s4tType.upui}>UPUI (AI 01 + AI 235)</option>
                            </optgroup>
                            <optgroup label="Other EPC Identifier">
                                <option value={s4tType.gid}>GID</option>
                                <option value={s4tType.usdod}>USDoD</option>
                                <option value={s4tType.adi}>ADI</option>
                                <option value={s4tType.bic}>BIC</option>
                                <option value={s4tType.imovn}>IMOVN</option>
                            </optgroup>
                            <optgroup label="Other">
                                <option value={s4tType.uri}>Enter a URI manually</option>
                            </optgroup>
                        </select>
                        {s4tTypeSelectContent(value, index)}
                        <button onClick={() => onS4tTypeDelete(value, index)} style={{backgroundColor: '#d9534f', marginLeft: '0.5rem'}}>DELETE</button>
                    </div>
                )
            case 'Parent ID':
                return (
                    <div style={{display: 'flex'}}>
                        <select onChange={(e) => onS4tTypeSelectChangeParentId(e)} value={value.s4tType}>
                            <option value="null">Choose...</option>
                            <optgroup label="GS1 Key">
                                <option value={s4tType.sgtin}>SGTIN (AI 01 + AI 21)</option>
                                <option value={s4tType.sscc}>SSCC (AI 00)</option>
                                <option value={s4tType.grai}>GRAI (AI 8003)</option>
                                <option value={s4tType.giai}>GIAI (AI 8004)</option>
                                <option value={s4tType.gsrn}>GSRN (AI 8018)</option>
                                <option value={s4tType.gsrnp}>GSRNP (AI 8017)</option>
                                <option value={s4tType.gdti}>GDTI (AI 253)</option>
                                <option value={s4tType.sgcn}>GCN (AI 255)</option>
                                <option value={s4tType.cpi}>CPI (AI 8010 + AI 8011)</option>
                                <option value={s4tType.ginc}>GINC (AI 401)</option>
                                <option value={s4tType.gsin}>GSIN (AI 402)</option>
                                <option value={s4tType.itip}>ITIP (AI 8006 + AI 21)</option>
                                <option value={s4tType.upui}>UPUI (AI 01 + AI 235)</option>
                            </optgroup>
                            <optgroup label="Other EPC Identifier">
                                <option value={s4tType.gid}>GID</option>
                                <option value={s4tType.usdod}>USDoD</option>
                                <option value={s4tType.adi}>ADI</option>
                                <option value={s4tType.bic}>BIC</option>
                                <option value={s4tType.imovn}>IMOVN</option>
                            </optgroup>
                            <optgroup label="Other">
                                <option value={s4tType.uri}>Enter a URI manually</option>
                            </optgroup>
                        </select>
                        {s4tTypeSelectContent(value, index)}
                    </div>
                )
            case 'Quantities':
                return (
                    <div style={{display: 'flex'}}>
                        <select onChange={(e) => onS4tTypeSelectChangeQty(e, value, index)} value={value.s4tType}>
                            <option value="null">Choose...</option>
                            <optgroup label="GS1 Key">
                                <option value={s4tType.lgtin}>LGTIN (AI 01 + AI 10)</option>
                                <option value={s4tType.sgtin}>GTIN, no serial (AI 01)</option>
                                <option value={s4tType.giai}>GRAI, no serial (AI 8003)</option>
                                <option value={s4tType.gdti}>GDTI, no serial (AI 253)</option>
                                <option value={s4tType.sgcn}>GCN, no serial (AI 255)</option>
                                <option value={s4tType.cpi}>CPI, no serial (AI 8010)</option>
                                <option value={s4tType.itip}>ITIP, no serial (AI 8006)</option>
                                <option value={s4tType.upui}>UPUI, no TPX (AI 01)</option>
                            </optgroup>
                            <optgroup label="Other">
                                <option value={s4tType.uri}>Enter a URI manually</option>
                            </optgroup>
                        </select>
                        {s4tTypeSelectContent(value, index)}
                        <div style={{display: 'flex'}}>
                            <select onChange={(e) => onQuantityTypeChange(e, value, index)} value={value.quantityType}>
                                <option value={quantityType['Fixed Measure Quantity']}>Fixed Measure Quantity</option>
                                <option value={quantityType['Variable Measure Quantity']}>Variable Measure Quantity</option>
                                <option value={quantityType['Unspecified Quantity']}>Unspecified Quantity</option>
                            </select>
                        </div>
                        {(value.quantityType === quantityType['Fixed Measure Quantity'] || value.quantityType === quantityType['Variable Measure Quantity']) &&
                            <input type='text' value={value.quantity} placeholder='Quantity' onChange={(e) => onQuantityChange(e, value, index)} />
                        }
                        {(value.quantityType === quantityType['Variable Measure Quantity']) &&
                            <input type='text' value={value.uom} placeholder='UOM' onChange={(e) => onUOMChange(e, value, index)} />
                        }
                        <button onClick={() => onS4tTypeDelete(value, index)} style={{backgroundColor: '#d9534f', marginLeft: '0.5rem'}}>DELETE</button>
                    </div>
                )
            case 'Quantities Output':
                return (
                    <div style={{display: 'flex'}}>
                        <select onChange={(e) => onS4tTypeSelectChangeQty(e, value, index)} value={value.s4tType}>
                            <option value="null">Choose...</option>
                            <optgroup label="GS1 Key">
                                <option value={s4tType.lgtin}>LGTIN (AI 01 + AI 10)</option>
                                <option value={s4tType.sgtin}>GTIN, no serial (AI 01)</option>
                                <option value={s4tType.giai}>GRAI, no serial (AI 8003)</option>
                                <option value={s4tType.gdti}>GDTI, no serial (AI 253)</option>
                                <option value={s4tType.sgcn}>GCN, no serial (AI 255)</option>
                                <option value={s4tType.cpi}>CPI, no serial (AI 8010)</option>
                                <option value={s4tType.itip}>ITIP, no serial (AI 8006)</option>
                                <option value={s4tType.upui}>UPUI, no TPX (AI 01)</option>
                            </optgroup>
                            <optgroup label="Other">
                                <option value={s4tType.uri}>Enter a URI manually</option>
                            </optgroup>
                        </select>
                        {s4tTypeSelectContent(value, index)}
                        <div style={{display: 'flex'}}>
                            <select onChange={(e) => onQuantityTypeChange(e, value, index)} value={value.quantityType}>
                                <option value={quantityType['Fixed Measure Quantity']}>Fixed Measure Quantity</option>
                                <option value={quantityType['Variable Measure Quantity']}>Variable Measure Quantity</option>
                                <option value={quantityType['Unspecified Quantity']}>Unspecified Quantity</option>
                            </select>
                        </div>
                        {(value.quantityType === quantityType['Fixed Measure Quantity'] || value.quantityType === quantityType['Variable Measure Quantity']) &&
                            <input type='text' value={value.quantity} placeholder='Quantity' onChange={(e) => onQuantityChange(e, value, index)} />
                        }
                        {(value.quantityType === quantityType['Variable Measure Quantity']) &&
                            <input type='text' value={value.uom} placeholder='UOM' onChange={(e) => onUOMChange(e, value, index)} />
                        }
                        <button onClick={() => onS4tTypeDelete(value, index)} style={{backgroundColor: '#d9534f', marginLeft: '0.5rem'}}>DELETE</button>
                    </div>
                )
            case 'Quantity':
                return (
                    <div style={{display: 'flex'}}>
                        <select onChange={(e) => onS4tTypeSelectChangeQty(e, value, index)} value={value.s4tType}>
                            <option value="null">Choose...</option>
                            <optgroup label="GS1 Key">
                                <option value={s4tType.lgtin}>LGTIN (AI 01 + AI 10)</option>
                                <option value={s4tType.sgtin}>GTIN, no serial (AI 01)</option>
                                <option value={s4tType.giai}>GRAI, no serial (AI 8003)</option>
                                <option value={s4tType.gdti}>GDTI, no serial (AI 253)</option>
                                <option value={s4tType.sgcn}>GCN, no serial (AI 255)</option>
                                <option value={s4tType.cpi}>CPI, no serial (AI 8010)</option>
                                <option value={s4tType.itip}>ITIP, no serial (AI 8006)</option>
                                <option value={s4tType.upui}>UPUI, no TPX (AI 01)</option>
                            </optgroup>
                            <optgroup label="Other">
                                <option value={s4tType.uri}>Enter a URI manually</option>
                            </optgroup>
                        </select>
                        {s4tTypeSelectContent(value, index)}
                        <input type='text' value={value.quantity} placeholder='Quantity' onChange={(e) => onQuantityChange(e, value, index)} />
                    </div>
                )
            case 'Read Point':
                return (
                    <div style={{display: 'flex'}}>
                        <select onChange={(e) => onS4tTypeSelectChangeReadPoint(e)} value={readPoint.s4tType}>
                            <option value="null">Choose...</option>
                            <optgroup label="GS1 Key">
                                <option value={s4tType.sgln}>SGLN + ext (AI 414 + AI 254)</option>
                            </optgroup>
                            <optgroup label="Other">
                                <option value={s4tType.uri}>Enter a URI manually</option>
                            </optgroup>
                        </select>
                        {s4tTypeSelectContent(value, index)}
                    </div>
                )
            case 'Business Location':
                return (
                    <div style={{display: 'flex'}}>
                        <select onChange={(e) => onS4tTypeSelectChangeBusinessLocation(e)} value={businessLocation.s4tType}>
                            <option value="null">Choose...</option>
                            <optgroup label="GS1 Key">
                                <option value={s4tType.sgln}>SGLN + ext (AI 414 + AI 254)</option>
                            </optgroup>
                            <optgroup label="Other">
                                <option value={s4tType.uri}>Enter a URI manually</option>
                            </optgroup>
                        </select>
                        {s4tTypeSelectContent(value, index)}
                    </div>
                )
        }
    }

    const optionDigits = () => {
        return (
            <React.Fragment>
                <option value="null">Choose</option>
                <option value="6">6 digits</option>
                <option value="7">7 digits</option>
                <option value="8">8 digits</option>
                <option value="9">9 digits</option>
                <option value="10">10 digits</option>
                <option value="11">11 digits</option>
                <option value="12">12 digits</option>
            </React.Fragment>
        )
    }

    const s4tTypeSelectContent = (value, index) => {
        switch (value.s4tType) {
            case s4tType.sgtin:
                return (
                    <div style={{display: 'flex'}}>
                        <span>(01)</span>
                        <input type='text' value={value.Al01} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al01')} />
                        <span>(21)</span>
                        <input type='text' value={value.Al02} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al02')} />
                        <span>GS1 Company Prefix Length</span>
                        <select value={value.GS1CompanyPrefix} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'GS1CompanyPrefix')}>
                            {optionDigits()}
                        </select>
                    </div>
                )
            case s4tType.sscc:
                return (
                    <div style={{display: 'flex'}}>
                        <span>(00)</span>
                        <input type='text' value={value.Al00} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al00')} />
                        <span>GS1 Company Prefix Length</span>
                        <select value={value.GS1CompanyPrefix} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'GS1CompanyPrefix')}>
                            {optionDigits()}
                        </select>
                    </div>
                )
            case s4tType.grai:
                return (
                    <div style={{display: 'flex'}}>
                        <span>(8003) 0</span>
                        <input type='text' value={value.Al8003} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al8003')} />
                        <span>GS1 Company Prefix Length</span>
                        <select value={value.GS1CompanyPrefix} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'GS1CompanyPrefix')}>
                            {optionDigits()}
                        </select>
                    </div>
                )
            case s4tType.giai:
                return (
                    <div style={{display: 'flex'}}>
                        <span>(8004)</span>
                        <input type='text' value={value.Al8004} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al8004')} />
                        <span>GS1 Company Prefix Length</span>
                        <select value={value.GS1CompanyPrefix} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'GS1CompanyPrefix')}>
                            {optionDigits()}
                        </select>
                    </div>
                )
            case s4tType.gsrn:
                return (
                    <div style={{display: 'flex'}}>
                        <span>(8018)</span>
                        <input type='text' value={value.Al8018} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al8018')} />
                        <span>GS1 Company Prefix Length</span>
                        <select value={value.GS1CompanyPrefix} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'GS1CompanyPrefix')}>
                            {optionDigits()}
                        </select>
                    </div>
                )
            case s4tType.gsrnp:
                return (
                    <div style={{display: 'flex'}}>
                        <span>(8017)</span>
                        <input type='text' value={value.Al8017} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al8017')} />
                        <span>GS1 Company Prefix Length</span>
                        <select value={value.GS1CompanyPrefix} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'GS1CompanyPrefix')}>
                            {optionDigits()}
                        </select>
                    </div>
                )
            case s4tType.gdti:
                return (
                    <div style={{display: 'flex'}}>
                        <span>(253)</span>
                        <input type='text' value={value.Al253} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al253')} />
                        <span>GS1 Company Prefix Length</span>
                        <select value={value.GS1CompanyPrefix} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'GS1CompanyPrefix')}>
                            {optionDigits()}
                        </select>
                    </div>
                )
            case s4tType.sgcn:
                return (
                    <div style={{display: 'flex'}}>
                        <span>(255)</span>
                        <input type='text' value={value.Al255} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al255')} />
                        <span>GS1 Company Prefix Length</span>
                        <select value={value.GS1CompanyPrefix} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'GS1CompanyPrefix')}>
                            {optionDigits()}
                        </select>
                    </div>
                )
            case s4tType.cpi:
                return (
                    <div style={{display: 'flex'}}>
                        <span>(8010)</span>
                        <input type='text' value={value.Al8010} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al8010')} />
                        <span>(8011)</span>
                        <input type='text' value={value.Al8011} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al8011')} />
                        <span>GS1 Company Prefix Length</span>
                        <select value={value.GS1CompanyPrefix} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'GS1CompanyPrefix')}>
                            {optionDigits()}
                        </select>
                    </div>
                )
            case s4tType.ginc:
                return (
                    <div style={{display: 'flex'}}>
                        <span>(401)</span>
                        <input type='text' value={value.Al401} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al401')} />
                        <span>GS1 Company Prefix Length</span>
                        <select value={value.GS1CompanyPrefix} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'GS1CompanyPrefix')}>
                            {optionDigits()}
                        </select>
                    </div>
                )
            case s4tType.gsin:
                return (
                    <div style={{display: 'flex'}}>
                        <span>(402)</span>
                        <input type='text' value={value.Al402} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al402')} />
                        <span>GS1 Company Prefix Length</span>
                        <select value={value.GS1CompanyPrefix} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'GS1CompanyPrefix')}>
                            {optionDigits()}
                        </select>
                    </div>
                )
            case s4tType.itip:
                return (
                    <div style={{display: 'flex'}}>
                        <span>(8006)</span>
                        <input type='text' value={value.Al8006} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al8006')} />
                        <span>(21)</span>
                        <input type='text' value={value.Al21} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al21')} />
                        <span>GS1 Company Prefix Length</span>
                        <select value={value.GS1CompanyPrefix} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'GS1CompanyPrefix')}>
                            {optionDigits()}
                        </select>
                    </div>
                )
            case s4tType.upui:
                return (
                    <div style={{display: 'flex'}}>
                        <span>(01)</span>
                        <input type='text' value={value.Al01} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al01')} />
                        <span>(235)</span>
                        <input type='text' value={value.Al235} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al235')} />
                        <span>GS1 Company Prefix Length</span>
                        <select value={value.GS1CompanyPrefix} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'GS1CompanyPrefix')}>
                            {optionDigits()}
                        </select>
                    </div>
                )
            case s4tType.gid:
                return (
                    <div style={{display: 'flex'}}>
                        <span>Mgr</span>
                        <input type='text' value={value.Mgr} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Mgr')} />
                        <span>Class</span>
                        <input type='text' value={value.Class} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Class')} />
                        <span>Ser</span>
                        <input type='text' value={value.Ser} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Ser')} />
                    </div>
                )
            case s4tType.usdod:
                return (
                    <div style={{display: 'flex'}}>
                        <span>CAGE/DoDAAC</span>
                        <input type='text' value={value['CAGE/DoDAAC']} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'CAGE/DoDAAC')} />
                        <span>Serial</span>
                        <input type='text' value={value.Serial} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Serial')} />
                    </div>
                )
            case s4tType.adi:
                return (
                    <div style={{display: 'flex'}}>
                        <span>CAGE/DoDAAC</span>
                        <input type='text' value={value['CAGE/DoDAAC']} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'CAGE/DoDAAC')} />
                        <span>PNO</span>
                        <input type='text' value={value.PNO} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'PNO')} />
                        <span>SER</span>
                        <input type='text' value={value.SER} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'SER')} />
                    </div>
                )
            case s4tType.bic:
                return (
                    <div style={{display: 'flex'}}>
                        <span>BIC</span>
                        <input type='text' value={value.BIC} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'BIC')} />
                    </div>
                )
            case s4tType.imovn:
                return (
                    <div style={{display: 'flex'}}>
                        <span>IMOVN</span>
                        <input type='text' value={value.IMOVN} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'IMOVN')} />
                    </div>
                )
            case s4tType.uri:
                return (
                    <div style={{display: 'flex'}}>
                        <span>URI</span>
                        <input type='text' value={value.URI} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'URI')} />
                    </div>
                )
            case s4tType.lgtin:
                return (
                    <div style={{display: 'flex'}}>
                        <span>(01)</span>
                        <input type='text' value={value.Al01} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al01')} />
                        <span>(10)</span>
                        <input type='text' value={value.Al10} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al10')} />
                        <span>GS1 Company Prefix Length</span>
                        <select value={value.GS1CompanyPrefix} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'GS1CompanyPrefix')}>
                            {optionDigits()}
                        </select>
                    </div>
                )
            case s4tType.sgln:
                return (
                    <div style={{display: 'flex'}}>
                        <span>(414)</span>
                        <input type='text' value={value.Al414} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al414')} />
                        <span>(254)</span>
                        <input type='text' value={value.Al254} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'Al254')} />
                        <span>GS1 Company Prefix Length</span>
                        <select value={value.GS1CompanyPrefix} onChange={(e) => s4tTypeSelectContentChange(e, value, index, 'GS1CompanyPrefix')}>
                            {optionDigits()}
                        </select>
                    </div>
                )
        }
    }

    const s4tTypeSelectContentChange = (event, value, index, type) => {
        let content = [];

        if (value.type === 'EPCs') {
            content = [...ePCs];
            content[index][type] = event.target.value;
            setEPCs(content);
        } else if (value.type === 'EPCs Output') {
            content = [...ePCsOutput];
            content[index][type] = event.target.value;
            setEPCsOutput(content);
        } else if (value.type === 'Quantities') {
            content = [...quantities];
            content[index][type] = event.target.value;
            setQuantities(content);
        } else if (value.type === 'Quantities Output') {
            content = [...quantitiesOutput];
            content[index][type] = event.target.value;
            setQuantitiesOutput(content);
        } else if (value.type === 'Quantity') {
            content = {...quantity};
            content[type] = event.target.value;
            setQuantity(content);
        } else if (value.type === 'Parent ID') {
            content = {...parentId};
            content[type] = event.target.value;
            setParentId(content);
        } else if (value.type === 'Read Point') {
            content = {...readPoint};
            content[type] = event.target.value;
            setReadPoint(content);
        } else if (value.type === 'Business Location') {
            content = {...businessLocation};
            content[type] = event.target.value;
            setBusinessLocation(content);
        }
    }

    const onBusinessTransactionAddAnother = () => {
        const newBusinessTransaction = [...bizTransactions];
        newBusinessTransaction.push({
            businessTransactionType: '',
            businessTransactionURI: ''
        });
        setBizTransactions(newBusinessTransaction);
    }

    const onBusinessTransactionTypeChange = (event, index) => {
        const newBusinessTransaction = [...bizTransactions];
        newBusinessTransaction[index].businessTransactionType = event.target.value;
        setBizTransactions(newBusinessTransaction);
    }

    const onBusinessTransactionURIChange = (event, index) => {
        const newBusinessTransaction = [...bizTransactions];
        newBusinessTransaction[index].businessTransactionURI = event.target.value;
        setBizTransactions(newBusinessTransaction);
    }

    const onDeleteBusinessTransaction = (index) => {
        const newBusinessTransaction = [...bizTransactions];
        newBusinessTransaction.splice(index, 1);
        setBizTransactions(newBusinessTransaction);
    }

    const onSourcesAddAnother = () => {
        const newSources = [...sources];
        newSources.push({
            sourceType: '',
            sourceURI: ''
        });
        setSources(newSources);
    }

    const onSourcesTypeChange = (event, index) => {
        const newSources = [...sources];
        newSources[index].sourceType = event.target.value;
        setSources(newSources);
    }

    const onSourcesURIChange = (event, index) => {
        const newSources = [...sources];
        newSources[index].sourceURI = event.target.value;
        setSources(newSources);
    }

    const onDeleteSource = (index) => {
        const newSource = [...sources];
        newSource.splice(index, 1);
        setSources(newSource);
    }

    const onDestinationsAddAnother = () => {
        const newDestinations = [...destinations];
        newDestinations.push({
            destinationType: '',
            destinationURI: ''
        });
        setDestinations(newDestinations);
    }

    const onDestinationsTypeChange = (event, index) => {
        const newDestinations = [...destinations];
        newDestinations[index].destinationType = event.target.value;
        setDestinations(newDestinations);
    }

    const onDestinationsURIChange = (event, index) => {
        const newDestinations = [...destinations];
        newDestinations[index].destinationURI = event.target.value;
        setDestinations(newDestinations);
    }

    const onDeleteDestination = (index) => {
        const newDestinations = [...destinations];
        newDestinations.splice(index, 1);
        setDestinations(newDestinations);
    }

    return (
        <Grid container padding='3rem'>
            <Grid item xs={12} md={6} align='center'>
                {displayButton()}
                <QrCodeScanner
                    scanResult={scanResult}
                    handleScanResult={handleScanResult}
                    scan={scan}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <table>
                    <tbody>
                        <tr>
                            <td style={{backgroundColor: '#868384'}}>
                                <div className='title-bar'></div>
                            </td>
                            <td>
                                <tr className='row'>
                                    <td className='row-title' style={{backgroundColor: '#e7e6e6'}}>
                                        Event type
                                    </td>
                                    <td className='row-content'>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <select onChange={(e) => setEventType1(e.target.value)} value={eventType1}>
                                                            {
                                                                Object.values(EventType1).map((event, i) => <option key={i}>{event}</option>)
                                                            }
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <select onChange={(e) => setEventType2(e.target.value)} value={eventType2}>
                                                            {
                                                                Object.values(EventType2).map((type, i) => <option key={i}>{type}</option>)
                                                            }
                                                        </select>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                {(eventType1 === EventType1.objectEvent || eventType1 === EventType1.agrigationEvent || eventType1 === EventType1.transactionEvent) &&
                                    <tr className='row'>
                                        <td className='row-title' style={{backgroundColor: '#e7e6e6'}}>
                                            Action
                                        </td>
                                        <td className='row-content'>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <select onChange={(e) => setAction(e.target.value)} value={action}>
                                                                {
                                                                    Object.values(Action).map((action, i) => <option key={i}>{action}</option>)
                                                                }
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                }
                                <tr className='row'>
                                    <td className='row-title' style={{backgroundColor: '#e7e6e6'}}>
                                        Event ID
                                    </td>
                                    <td className='row-content'>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <input style={{width: '25rem'}} type='text' placeholder='Enter on Event ID (seldom needed - see FAQ)' value={eventId} onChange={(e) => setEventId(e.target.value)}></input>
                                                    </td>
                                                    <td style={{display: 'flex'}}>
                                                        <button onClick={generate}>GENERATE</button>
                                                        <p className='hint'>WAIT! Leave this blank in most cases; see the FAQ.</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </td>
                        </tr>
                        {eventType2 === EventType2.errorDeclaration &&
                            <tr>
                                <td style={{backgroundColor: '#cc0000'}}>
                                    <div className='title-bar'>ERR</div>
                                </td>
                                <td>
                                    <tr className='row'>
                                        <td className='row-title' style={{backgroundColor: '#F2C2CC'}}>
                                            Declaration Time
                                        </td>
                                        <td className='row-content'>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <input type='date' value={declarationTime} onChange={(e) => setDeclarationTime(e.target.value)}></input>
                                                        </td>
                                                        <td style={{display: 'flex'}}>
                                                            <select onChange={(e) => setDeclarationTimeZone(e.target.value)} value={declarationTimeZone}>
                                                                {
                                                                    timezones.map((t, i) => <option key={i}>{t}</option>)
                                                                }
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr className='row'>
                                        <td className='row-title' style={{backgroundColor: '#F2C2CC'}}>
                                            Reason
                                        </td>
                                        <td className='row-content'>
                                            <table>
                                                <tbody>
                                                    <input type='text' value={reason} onChange={(e) => setReason(e.target.value)} placeholder='Enter a reason URI'></input>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr className='row'>
                                        <td className='row-title' style={{backgroundColor: '#F2C2CC'}}>
                                            Corrective Event IDs
                                        </td>
                                        <td className='row-content'>
                                            <table>
                                                <tbody>
                                                    {
                                                        correctiveEventIds.map((ids, i) => {
                                                            return (
                                                                <div>
                                                                    <input key={i} placeholder='Enter an event ID' value={correctiveEventIds[i]} onChange={(e) => onChangeCorrectiveEventIdsAddAnother(e, i)}></input>
                                                                    <button onClick={() => onDeleteCorrectiveEventIds(i)} style={{backgroundColor: '#d9534f', marginLeft: '0.5rem'}}>DELETE</button>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    <button onClick={onCorrectiveEventIdsAddAnother}>ADD ANOTHER</button>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </td>
                            </tr>
                        }
                        <tr>
                            <td style={{backgroundColor: '#a854a8'}}>
                                <div className='title-bar'>WHEN</div>
                            </td>
                            <td>
                                <tr className='row'>
                                    <td className='row-title' style={{backgroundColor: '#eedded'}}>
                                        Event type
                                    </td>
                                    <td className='row-content'>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <input type='date' value={eventTime} onChange={(e) => setEventTime(e.target.value)}></input>
                                                    </td>
                                                    <td style={{display: 'flex'}}>
                                                        <select onChange={(e) => setEventTimeTimeZone(e.target.value)} value={eventTimeTimeZone}>
                                                            {
                                                                timezones.map((t, i) => <option key={i}>{t}</option>)
                                                            }
                                                        </select>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr className='row'>
                                    <td className='row-title' style={{backgroundColor: '#eedded'}}>
                                        Event type
                                    </td>
                                    <td className='row-content'>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <input type='date' value={recordTime} onChange={(e) => setRecordTime(e.target.value)}></input>
                                                    </td>
                                                    <td style={{display: 'flex'}}>
                                                        <select onChange={(e) => setRecordTimeTimeZone(e.target.value)} value={recordTimeTimeZone}>
                                                            {
                                                                timezones.map((t, i) => <option key={i}>{t}</option>)
                                                            }
                                                        </select>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </td>
                        </tr>
                        <tr>
                            <td style={{backgroundColor: '#607fbf'}}>
                                <div className='title-bar'>WHAT</div>
                            </td>
                            <td>
                                {eventType1 === EventType1.choose &&
                                    <tr className='row'>
                                        <td className='row-title' style={{backgroundColor: '#dfe5f1'}}>
                                        </td>
                                        <td className='row-content' style={{height: '73.19px'}}>
                                            <p style={{margin: '0.1rem'}}>Please choose an event type, above</p>
                                        </td>
                                    </tr>
                                }
                                {eventType1 === EventType1.objectEvent &&
                                    <React.Fragment>
                                        <tr className='row'>
                                            <td className='row-title' style={{backgroundColor: '#dfe5f1'}}>
                                                EPCs
                                            </td>
                                            <td className='row-content'>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {
                                                                    ePCs.map((x, i) => {
                                                                        return (
                                                                            <div key={i}>
                                                                                {s4tTypeSelect(x, i)}
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <div style={{display: 'flex'}}>
                                                                    <button onClick={() => onEPCsAddAnother('EPCs')}>ADD ANOTHER</button>
                                                                    <p className='hint'>Use this for identifiers unique to a single object (“instance-level” or “serialized” identifiers)</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr className='row'>
                                            <td className='row-title' style={{backgroundColor: '#dfe5f1'}}>
                                                Quantities
                                            </td>
                                            <td className='row-content'>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {
                                                                    quantities.map((x, i) => {
                                                                        return (
                                                                            <div key={i}>
                                                                                {s4tTypeSelect(x, i)}
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <div style={{display: 'flex'}}>
                                                                    <button onClick={() => onQuantitiesAddAnother('Quantities')}>ADD ANOTHER</button>
                                                                    <p className='hint'>Use this for identifiers shared by multiple objects (“lot-level,” “class-level” or “non-serialized” identifiers)</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                }
                                {eventType1 === EventType1.agrigationEvent &&
                                    <React.Fragment>
                                        <tr className='row'>
                                            <td className='row-title' style={{backgroundColor: '#dfe5f1'}}>
                                                Parent ID
                                            </td>
                                            <td className='row-content'>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {s4tTypeSelect(parentId, 0)}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr className='row'>
                                            <td className='row-title' style={{backgroundColor: '#dfe5f1'}}>
                                                Child EPCs
                                            </td>
                                            <td className='row-content'>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {
                                                                    ePCs.map((x, i) => {
                                                                        return (
                                                                            <div key={i}>
                                                                                {s4tTypeSelect(x, i)}
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <div style={{display: 'flex'}}>
                                                                    <button onClick={() => onEPCsAddAnother('EPCs')}>ADD ANOTHER</button>
                                                                    <p className='hint'>Use this for identifiers unique to a single object (“instance-level” or “serialized” identifiers)</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr className='row'>
                                            <td className='row-title' style={{backgroundColor: '#dfe5f1'}}>
                                                Child Quantities
                                            </td>
                                            <td className='row-content'>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {
                                                                    quantities.map((x, i) => {
                                                                        return (
                                                                            <div key={i}>
                                                                                {s4tTypeSelect(x, i)}
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <div style={{display: 'flex'}}>
                                                                    <button onClick={() => onQuantitiesAddAnother('Quantities')}>ADD ANOTHER</button>
                                                                    <p className='hint'>Use this for identifiers shared by multiple objects (“lot-level,” “class-level” or “non-serialized” identifiers)</p>
                                                                </div>   
                                                            </td>    
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                }
                                {eventType1 === EventType1.transactionEvent &&
                                    <React.Fragment>
                                        <tr className='row'>
                                            <td className='row-title' style={{backgroundColor: '#dfe5f1'}}>
                                                Parent ID
                                            </td>
                                            <td className='row-content'>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {s4tTypeSelect(parentId, 0)}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr className='row'>
                                            <td className='row-title' style={{backgroundColor: '#dfe5f1'}}>
                                                EPCs
                                            </td>
                                            <td className='row-content'>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {
                                                                    ePCs.map((x, i) => {
                                                                        return (
                                                                            <div key={i}>
                                                                                {s4tTypeSelect(x, i)}
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <div style={{display: 'flex'}}>
                                                                    <button onClick={() => onEPCsAddAnother('EPCs')}>ADD ANOTHER</button>
                                                                    <p className='hint'>Use this for identifiers unique to a single object (“instance-level” or “serialized” identifiers)</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr className='row'>
                                            <td className='row-title' style={{backgroundColor: '#dfe5f1'}}>
                                                Quantities
                                            </td>
                                            <td className='row-content'>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {
                                                                    quantities.map((x, i) => {
                                                                        return (
                                                                            <div key={i}>
                                                                                {s4tTypeSelect(x, i)}
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <div style={{display: 'flex'}}>
                                                                    <button onClick={() => onQuantitiesAddAnother('Quantities')}>ADD ANOTHER</button>
                                                                    <p className='hint'>Use this for identifiers shared by multiple objects (“lot-level,” “class-level” or “non-serialized” identifiers)</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                }
                                {eventType1 === EventType1.transformationEvent &&
                                    <React.Fragment>
                                        <tr className='row'>
                                            <td className='row-title' style={{backgroundColor: '#dfe5f1'}}>
                                                Xform ID
                                            </td>
                                            <td className='row-content'>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <input type='text' placeholder='Enter a Transformation ID URI (optional)' value={xformId} onChange={(e) => setXformId(e.target.value)} />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr className='row'>
                                            <td className='row-title' style={{backgroundColor: '#dfe5f1'}}>
                                                Input EPCs
                                            </td>
                                            <td className='row-content'>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {
                                                                    ePCs.map((x, i) => {
                                                                        return (
                                                                            <div key={i}>
                                                                                {s4tTypeSelect(x, i)}
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <div style={{display: 'flex'}}>
                                                                    <button onClick={() => onEPCsAddAnother('EPCs')}>ADD ANOTHER</button>
                                                                    <p className='hint'>Use this for identifiers unique to a single object (“instance-level” or “serialized” identifiers)</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr className='row'>
                                            <td className='row-title' style={{backgroundColor: '#dfe5f1'}}>
                                                Input Quantities
                                            </td>
                                            <td className='row-content'>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {
                                                                    quantities.map((x, i) => {
                                                                        return (
                                                                            <div key={i}>
                                                                                {s4tTypeSelect(x, i)}
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <div style={{display: 'flex'}}>
                                                                    <button onClick={() => onQuantitiesAddAnother('Quantities')}>ADD ANOTHER</button>
                                                                    <p className='hint'>Use this for identifiers shared by multiple objects (“lot-level,” “class-level” or “non-serialized” identifiers)</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr className='row'>
                                            <td className='row-title' style={{backgroundColor: '#dfe5f1'}}>
                                                Output EPCs
                                            </td>
                                            <td className='row-content'>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {
                                                                    ePCsOutput.map((x, i) => {
                                                                        return (
                                                                            <div key={i}>
                                                                                {s4tTypeSelect(x, i)}
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <div style={{display: 'flex'}}>
                                                                    <button onClick={() => onEPCsAddAnother('EPCs Output')}>ADD ANOTHER</button>
                                                                    <p className='hint'>Use this for identifiers unique to a single object (“instance-level” or “serialized” identifiers)</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr className='row'>
                                            <td className='row-title' style={{backgroundColor: '#dfe5f1'}}>
                                                Output Quantities
                                            </td>
                                            <td className='row-content'>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {
                                                                    quantitiesOutput.map((x, i) => {
                                                                        return (
                                                                            <div key={i}>
                                                                                {s4tTypeSelect(x, i)}
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <div style={{display: 'flex'}}>
                                                                    <button onClick={() => onQuantitiesAddAnother('Quantities Output')}>ADD ANOTHER</button>
                                                                    <p className='hint'>Use this for identifiers shared by multiple objects (“lot-level,” “class-level” or “non-serialized” identifiers)</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                }
                                {eventType1 === EventType1.quantityEvent &&
                                    <React.Fragment>
                                        <tr className='row'>
                                            <td className='row-title' style={{backgroundColor: '#dfe5f1'}}>
                                                Quantity
                                            </td>
                                            <td className='row-content'>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {s4tTypeSelect(quantity, 0)}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td style={{backgroundColor: '#478f77'}}>
                                <div className='title-bar'>WHERE</div>
                            </td>
                            <td>
                                <tr className='row'>
                                    <td className='row-title' style={{backgroundColor: '#dae9e4'}}>
                                        Read Point
                                    </td>
                                    <td className='row-content'>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        {s4tTypeSelect(readPoint, 0)}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr className='row'>
                                    <td className='row-title' style={{backgroundColor: '#dae9e4'}}>
                                        Business Location
                                    </td>
                                    <td className='row-content'>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        {s4tTypeSelect(businessLocation, 0)}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </td>
                        </tr>
                        <tr>
                            <td style={{backgroundColor: '#e6c72e'}}>
                                <div className='title-bar'>WHY</div>
                            </td>
                            <td>
                                <tr className='row'>
                                    <td className='row-title' style={{backgroundColor: '#faf4d5'}}>
                                        Business Step
                                    </td>
                                    <td className='row-content'>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <input type='text' value={businessStep} placeholder='Enter a business step URI' onChange={(e) => setBusinessStep(e.target.value)} />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr className='row'>
                                    <td className='row-title' style={{backgroundColor: '#faf4d5'}}>
                                        Disposition
                                    </td>
                                    <td className='row-content'>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <input type='text' value={disposition} placeholder='Enter a disposition URI' onChange={(e) => setDisposition(e.target.value)} />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr className='row'>
                                    <td className='row-title' style={{backgroundColor: '#faf4d5'}}>
                                        Biz Transactions
                                    </td>
                                    <td className='row-content'>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        {
                                                            bizTransactions.map((b, i) => {
                                                                return (
                                                                    <div key={i} style={{display: 'flex'}}>
                                                                        <input type='text' placeholder='Enter business transaction type (optional)' value={b.businessTransactionType} onChange={(e) => onBusinessTransactionTypeChange(e, i)}/>
                                                                        <input type='text' placeholder='Enter a business transaction URI' value={b.businessTransactionURI} onChange={(e) => onBusinessTransactionURIChange(e, i)} />
                                                                        <button onClick={() => onDeleteBusinessTransaction(i)} style={{backgroundColor: '#d9534f', marginLeft: '0.5rem'}}>DELETE</button>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                        <button onClick={() => onBusinessTransactionAddAnother()}>ADD ANOTHER</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                {(eventType1 !== EventType1.transformationEvent && eventType1 !== EventType1.quantityEvent && eventType1 !== EventType1.choose) &&
                                    <React.Fragment>
                                        <tr className='row'>
                                            <td className='row-title' style={{backgroundColor: '#faf4d5'}}>
                                                Sources
                                            </td>
                                            <td className='row-content'>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {
                                                                    sources.map((s, i) => {
                                                                        return (
                                                                            <div key={i} style={{display: 'flex'}}>
                                                                                <input type='text' placeholder='Enter a source type' value={s.sourceType} onChange={(e) => onSourcesTypeChange(e, i)}/>
                                                                                <input type='text' placeholder='Enter a source URI' value={s.sourceURI} onChange={(e) => onSourcesURIChange(e, i)} />
                                                                                <button onClick={() => onDeleteSource(i)} style={{backgroundColor: '#d9534f', marginLeft: '0.5rem'}}>DELETE</button>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <button onClick={() => onSourcesAddAnother()}>ADD ANOTHER</button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr className='row'>
                                            <td className='row-title' style={{backgroundColor: '#faf4d5'}}>
                                                Destinations
                                            </td>
                                            <td className='row-content'>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                {
                                                                    destinations.map((s, i) => {
                                                                        return (
                                                                            <div key={i} style={{display: 'flex'}}>
                                                                                <input type='text' placeholder='Enter a source type' value={s.sourceType} onChange={(e) => onDestinationsTypeChange(e, i)}/>
                                                                                <input type='text' placeholder='Enter a source URI' value={s.sourceURI} onChange={(e) => onDestinationsURIChange(e, i)} />
                                                                                <button onClick={() => onDeleteDestination(i)} style={{backgroundColor: '#d9534f', marginLeft: '0.5rem'}}>DELETE</button>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                                <button onClick={() => onDestinationsAddAnother()}>ADD ANOTHER</button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={save} className='save'>SAVE</button>
                <button onClick={cancel} className='cancel'>CANCEL</button>
            </Grid>
        </Grid>
    )
}

export default NewEpicsEventPage;