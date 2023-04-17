import { useState, useTransition } from "react";
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list"
import timeGridPlugin from "@fullcalendar/timegrid"
import FullCalendar from "@fullcalendar/react"
import { formatDate } from '@fullcalendar/core'
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Box } from "@mui/system";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import allLocales from '@fullcalendar/core/locales-all'

const Calendar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const [currentEvents, setCurrentEvents] = useState([])
    console.log('currentEvents', currentEvents[0]?.id)

    const { t ,i18n}= useTranslation();

    const handleDateClick = (selected)=>{
        const title = prompt("Please enter a new title for your event")
        const calendarApi = selected.view.calendar
        calendarApi.unselect();

        if(title){
            calendarApi.addEvent({
                id:`${selected.dateStr}-${title}`,
                title,
                start:selected.startStr,
                end:selected.endStr,
                allDay:selected.allDay
            })    
        }
    }
    const onEventSet = async (events)=>{
        setCurrentEvents(events)
        let arrayMap = [];
        events.map((event)=>{
            arrayMap.push({
                id: new Date(event?.startStr).getTime(),
                title:event?.title,
                start:event?.startStr,
                end:event?.endStr,
                allDay:event?.allDay
            })
        })
        console.log('arrayMap', arrayMap)
    }

    const handleEventClick = (selected)=>{
        if(window.confirm(`Are you sure you want to delete the event ${selected.event.title}`)){
            selected.event.remove();
        }
    }

    return (
       <Box m="20px">
         <Header title={t('calendar')} subtitle={t('subCalendar')}/>
        <Box display={'flex'} justifyContent={'space-between'}>
            {/* sider bar calendar  */}
            <Box flex={'1 1 20%'} backgroundColor={colors.primary[400]} p="15px" borderRadius="4px">
                <Typography variant="h5">{t('events')}</Typography>
                <List>
                {currentEvents.map((event) => (
                    <ListItem
                        key={event.id}
                        sx={{
                        backgroundColor: colors.greenAccent[500],
                        margin: "10px 0",
                        borderRadius: "2px",
                        }}
                    >
                        <ListItemText
                        primary={event.title}
                        secondary={
                            <Typography>
                            {formatDate(event.start, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                            </Typography>
                        }
                        />
                    </ListItem>
                    ))}
                </List>
            </Box>
            {/* calendar */}
            <Box flex="1 1 100%" ml="15px">
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
                initialEvents={[
                {
                    id: "12315",
                    title: "All-day event",
                    date: "2023-04-17",
                },
                {
                    id: "5123",
                    title: "Timed event",
                    date: "2022-04-18",
                },
                ]}
            />
            </Box>
            </Box>
       </Box>
    )
}

export default Calendar