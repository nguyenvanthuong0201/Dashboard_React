import { useState, useTransition } from "react";
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list"
import timeGridPlugin from "@fullcalendar/timegrid"
import FullCalendar from "@fullcalendar/react"
import { formatDate } from '@fullcalendar/core'
import Header from "../../components/Header";
import { Box } from "@mui/system";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import allLocales from '@fullcalendar/core/locales-all'
import { useGetCalendar } from "../../queries/useCalendar";

const Calendar = () => {
    const [currentEvents, setCurrentEvents] = useState([])
    const { t, i18n } = useTranslation();
    const { data: calendar } = useGetCalendar('U1681871914158')


    const handleDateClick = (selected) => {
        const title = prompt("Please enter a new title for your event")
        const calendarApi = selected.view.calendar
        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay
            })
        }
    }
    const onEventSet = async (events) => {
        setCurrentEvents(events)
        let arrayMap = [];
        events.map((event) => {
            arrayMap.push({
                id: new Date(event?.startStr).getTime(),
                title: event?.title,
                start: event?.startStr,
                end: event?.endStr,
                allDay: event?.allDay
            })
        })
        console.log('arrayMap', arrayMap)
    }

    const handleEventClick = (selected) => {
        if (window.confirm(`Are you sure you want to delete the event ${selected.event.title}`)) {
            selected.event.remove();
        }
    }

    return (
        <div className=" bg-gray-100 dark:bg-slate-800">
            <div className="p-5">
                <Header title={t('calendar')} subtitle={t('subCalendar')} />
                <Box display={'flex'} justifyContent={'space-between'}>
                    {/* sider bar calendar  */}
                    <div className="flex-[1_1_20%] dark:bg-indigo-500 bg-green-200 p-4 rounded max-h-[75vh] overflow-y-scroll">
                        <div className="text-lg font-bold text-slate-900 dark:text-white">{t('events')}</div>
                        <List>
                            {currentEvents.map((event) => (
                                <ListItem
                                    key={event.id}
                                    className="bg-white my-2 rounded"
                                >
                                    <ListItemText
                                        className="text-center"
                                        primary={event.title}
                                        secondary={
                                            <span className="text-sm" >
                                                {formatDate(event.start, {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </div>

                    {/* calendar */}
                    <div flex="1 1 100%" ml="15px" className="flex-[1_1_100%] ml-3 text-slate-900 dark:text-white">
                        <FullCalendar
                            locales={allLocales} locale={i18n.language}
                            height="75vh"
                            plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin,
                                listPlugin,
                            ]}
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                            }}
                            initialView="dayGridMonth"
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            select={handleDateClick}
                            eventClick={handleEventClick}
                            eventsSet={(events) => onEventSet(events)}
                            initialEvents={calendar?.result}
                        />
                    </div>
                </Box>
            </div>
        </div>
    )
}

export default Calendar