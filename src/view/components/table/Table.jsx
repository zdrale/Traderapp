import { useEffect, useState } from 'react';
import { fetchFirstFiveSymbols } from '../../../api/apiService';


function Table() {
    const [tableData, setTableData] = useState([]);
    const [currencyPairs, setCurrencyPairs] = useState([]);


    useEffect(() => {
        (async () => {
            const firstFivePairs = await fetchFirstFiveSymbols();
            setCurrencyPairs(firstFivePairs);
        })();
    }, []);



    useEffect(() => {
        const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

        socket.onopen = () => {
            currencyPairs.forEach(pair => {
                const subscriptionMessage = JSON.stringify({
                    event: 'subscribe',
                    channel: 'ticker',
                    symbol: `${pair.toUpperCase()}`,
                });
                socket.send(subscriptionMessage);
            });
        };

        socket.onmessage = event => {
            const data = JSON.parse(event.data);
            console.log(data);

            if (Array.isArray(data) && data[1] === 'hb') return;
            const [, , , , change, changePercent, lastPrice, , high, low] = data[1];
            const newData = {
                lastPrice,
                change,
                changePercent,
                high,
                low,
            };

            setTableData(prevData => {
                return [...prevData, newData];
            });
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };
    }, [currencyPairs]);


    const columns = [
        { header: 'Name', accessor: 'symbol' },
        { header: 'Last', accessor: 'lastPrice' },
        { header: 'Change', accessor: 'change' },
        { header: 'Change Percent', accessor: 'changePercent' },
        { header: 'High', accessor: 'high' },
        { header: 'Low', accessor: 'low' },
    ];

    return (
        <table className="table border-collapse w-screen">
            <thead>
                <tr className="bg-gray-200">
                    {columns.map(column => (
                        <th key={column.header} className="py-2 px-4 font-semibold text-left">{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableData.map((data, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                        {columns.map(column => (
                            <td key={column.accessor} className="py-2 px-4">{data[column.accessor]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;