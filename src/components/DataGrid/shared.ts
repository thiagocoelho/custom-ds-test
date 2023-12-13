import { DataSourceItem } from "./DataGrid.types";

export function groupByDataSource(dataSource: DataSourceItem[], key: string): (string | number)[] {
  const groupedValues: (string | number)[] = [];

  dataSource.forEach(item => {
    const value = item[key];
    const existingGroup = groupedValues.find(group => group === value);

    if (!existingGroup) {
      groupedValues.push(value);
    }
  });

  return groupedValues;
}

export function sortDataSourceByColumn(jsonData: any[], column: string, order: string): any[] {
  return jsonData.sort((a, b) => {
    const valueA = a[column];
    const valueB = b[column];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      if (order === 'asc') {
        return valueA.localeCompare(valueB);
      } else if (order === 'desc') {
        return valueB.localeCompare(valueA);
      }
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      if (order === 'asc') {
        return valueA - valueB;
      } else if (order === 'desc') {
        return valueB - valueA;
      }
    }

    return 0;
  });
}

export function filterDataSource(
  dataSource: DataSourceItem[],
  column: string,
  filter: string,
  exactTime: boolean = false,
): DataSourceItem[] {
  return dataSource.filter(item => {
    const value = item[column];
    if (typeof value === 'string' || value.constructor === Date) {
      const stringValue = (value as string).toString().toLowerCase();
      const filterValue = filter.toLowerCase();

      if (exactTime && filterValue.length === 5) {
        return stringValue === filterValue;
      }

      if (stringValue.includes(filterValue)) {
        return true;
      }

      if (stringValue.includes(':') && filterValue.includes(':')) {
        const [hour, minute] = stringValue.split(':');
        const [filterHour, filterMinute] = filterValue.split(':');

        if (filterValue.length === 5) {
          return stringValue === filterValue;
        }

        if (filterHour.length === 1 && hour === filterHour) {
          return true;
        }

        if (filterMinute.length === 1 && minute === filterMinute) {
          return true;
        }
      }
    } else if (typeof value === 'number') {
      const numberValue = (value as number).toString();
      return numberValue.includes(filter);
    }

    return false;
  });
}

export function filterItemsByColumn(dataSource: any[], column: string, filterValues: any[]): any[] {
  return dataSource.filter(item => {
    const columnValue = item[column];
    return filterValues.includes(columnValue);
  });
}

// PROVISORIO BAIXO
export function generateRandomDataSource(numRows: number) {
  const campanhas = ['Campanha 1', 'Campanha 2', 'Campanha 3', 'Campanha 4', 'Campanha 5'];
  const agents = [16321, 16322, 16323, 16324, 16325];
  const disposals = ['Tabulação 1', 'Tabulação 2', 'Tabulação 3', 'Tabulação 4', 'Tabulação 5'];

  const dataSource = [];

  for (let i = 0; i < numRows; i++) {
    const data = generateRandomDate();
    const duration = generateRandomDuration();
    const campanha = getRandomElement(campanhas);
    const agente = getRandomElement(agents);
    const ani = generateRandomNumber(50000000, 60000000);
    const dnis = generateRandomNumber(100000, 999999);
    const disposition = getRandomElement(disposals);
    const origem = generateRandomNumber(12000, 13000);
    const id = i + 1;

    const item = {
      data,
      duration,
      campanha,
      agente,
      ani,
      dnis,
      disposition,
      origem,
      id,
    };

    dataSource.push(item);
  }

  return dataSource;
}

export function generateRandomDate() {
  const startDate = new Date('2020-01-01');
  const currentDate = new Date();
  const randomTimestamp = Math.random() * (currentDate.getTime() - startDate.getTime()) + startDate.getTime();
  const randomDate = new Date(randomTimestamp);
  const day = randomDate.getDate().toString().padStart(2, '0');
  const month = (randomDate.getMonth() + 1).toString().padStart(2, '0');
  const year = randomDate.getFullYear();
  return `${day}/${month}/${year}`;
}

export function generateRandomDuration() {
  const hours = generateRandomNumber(0, 10).toString().padStart(2, '0');
  const minutes = generateRandomNumber(0, 59).toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomElement(array: any[]) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
