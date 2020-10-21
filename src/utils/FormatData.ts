import _, {isObject, isArray} from 'lodash';

export const isEmpty = (data: any) => {
  if (typeof data === 'object') {
    if (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]') {
      return true;
    } else if (!data) {
      return true;
    }
    return false;
  } else if (typeof data === 'string') {
    if (!data.trim()) {
      return true;
    }
    return false;
  } else if (typeof data === 'undefined') {
    return true;
  } else {
    return false;
  }
};
export class FormatData {
  response: any | undefined;

  constructor(swaggerDocument: any | undefined) {
    this.filterData(swaggerDocument);
  }

  filterData(swaggerDocument: any | undefined) {
    let getData = this.getDataJson(swaggerDocument);
    getData = this.filterDataArrays(getData);
    this.response = this.filterSetArray(getData);
  }

  filterSetArray(list: any[]) {
    const response: string[][] = [];
    let lastElement = '';
    list.forEach((element: string) => {
      if (lastElement === '') {
        lastElement = element;
      } else {
        response.push([lastElement, element]);
        lastElement = '';
      }
    });
    return response;
  }

  filterDataArrays(response: any[], list: any[] = []) {
    response.forEach((element: any) => {
      const data: any = element;
      if (isArray(data)) {
        this.filterDataArrays(data, list);
      } else {
        list.push(data);
      }
    });
    return list;
  }

  getDataJson(data: any, title?: any): any {
    const response = Object.keys(data).map((key) => {
      let titleMain = key;
      if (title) {
        titleMain = `${title}.${titleMain}`;
      }
      const dataT = data[key];
      if (isObject(data[key])) {
        return this.getDataJson(dataT, titleMain);
      } else {
        return [titleMain, dataT];
      }
    });
    return response;
  }
}
