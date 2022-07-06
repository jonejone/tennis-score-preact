import {Fragment, FunctionalComponent, h } from 'preact';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import format from 'date-fns/format'

export const DateSelector = ({setDate, date}: {setDate: any, date: string}) => {

    const chooseDate = (ev: any) => {
        setDate(ev.target.dataset.date);
    }

    const today = format(new Date(), 'yyyy-MM-dd');
    const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd');
    const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');

    const dates = [
        {
            label: 'Yesterday',
            value: yesterday,
        },
        {
            label: 'Today',
            value: today,
        },
        {
            label: 'Tomorrow',
            value: tomorrow,
        },
    ]

    return (
        <div class="text-center my-5">
            {dates.map((date_obj: any, index) => (
                <button
                    data-date={date_obj.value}
                    class={"mr-2 text-white font-bold py-2 px-4 rounded-full " + (date_obj.value == date ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-700")}
                    onClick={chooseDate}>{date_obj.label}</button>
            ))}
        </div>
    )
}