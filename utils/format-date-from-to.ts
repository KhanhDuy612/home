import moment from 'moment';

export const formatDateFromTo = (dateFrom?: string, dateTo?: string) => {
    if (!dateFrom || !dateTo) return '';
    const from = moment(dateFrom);
    const to = moment(dateTo);

    if (from.year() === to.year()) {
        if(from.month() === to.month()) {
            return `${from.format('D')} - ${to.format('D MMM YYYY')}`;
        } else {
            return `${from.format('D MMM')} - ${to.format('D MMM YYYY')}`;
        }
    } else {
        return `${from.format('D MMM YYYY')} - ${to.format('D MMM YYYY')}`;
    }
};

