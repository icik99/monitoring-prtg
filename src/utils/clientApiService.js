import request from "./requestClient";

class ClientRequest {

    static urlAPI = "http://localhost:5006/"
    static token = '5Z23HMY56Y7GRFHAFGVQM3ZPVUSC36P5ZU2ASTNTU4======';

    // Auth
    static Login(username, password) {
        let path = 'login';
        return request(`${this.urlAPI}${path}`, {
            method: 'POST',
            data: {
                username,
                password,
            },
        });
    }

    static GetDataMonitoring(token) {
        let path = 'monitoring';
        return request(`${this.urlAPI}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    static Register(data) {
        let path = 'register';
        return request(`${this.urlAPI}${path}`, {
            method: 'POST',
            data,
        });
    }

    static CountDashboard(token) {
        let path = `amount-dashboard`;
        return request(`${this.urlAPI}${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    static GetHistoricData(id, startDate, endDate, average) {
        let path = `historicdata_html.htm?id=${id}&sdate=${startDate}&edate=${endDate}&avg=${average}&pctavg=300&pctshow=false&pct=95&pctmode=false&hide=NaN&apitoken=${this.urlAPI.token}`;
        return request(`${this.urlAPI}${path}`, {
            method: 'GET',
        });
    }

    static GetHistoricDataCsv(id, startDate, endDate, average) {
        let path = `historicdata.csv?id=${id}&avg=${average}&sdate=${startDate}&edate=${endDate}&usecaption=1&apitoken=${this.token}`;
        return request(`${this.urlAPI}${path}`, {
            method: 'GET',
        });
    }

    static GetSensorDevice() {
        let path = `api/table.json?content=sensor&columns=objid,sensor&apitoken=${this.token}&usecaption=true&filter_parentid=2068`;
        return request(`${this.urlAPI}${path}`, {
            method: 'GET',
        });
    }
}

export default ClientRequest;
