const GOOGLE_ACCESS_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_CALENDAR_API_URL =
  "https://www.googleapis.com/calendar/v3/calendars/primary/events";
const client_id =
  "136924184007-1aj1o44albnppfdj605p4d76timo4b76.apps.googleusercontent.com";
const client_secret = "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";
const refresh_token =
  "1//04iJRYkKO3A-8CgYIARAAGAQSNwF-L9IrppCdGkRJ0wS047GQ0ZPHMxXihH7_T_tnP-bf4wAgNlKcYn86KCDVAx53yBPprfoW0rE";

const getAccessToken = async () => {
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: client_id,
    client_secret: client_secret,
    refresh_token: refresh_token,
  });
  try {
    const response = await fetch(GOOGLE_ACCESS_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch access token");
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error.message);
    throw error;
  }
};

const createMeetEvent = async (meeting) => {
  const accessToken = await getAccessToken();

  const event = {
    summary: meeting.name,
    start: {
      dateTime: new Date(meeting.startTime),
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: new Date(meeting.endTime),
      timeZone: "Asia/Kolkata",
    },
    conferenceData: {
      createRequest: {
        requestId: Math.floor(Math.random() * 9000000000) + 1,
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    },
    extendedProperties: {
      private: {
        eventType: "StressAway",
      },
    },
  };

  try {
    const url = new URL(GOOGLE_CALENDAR_API_URL);
    url.searchParams.append("conferenceDataVersion", "1");

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      throw new Error("Failed to create event");
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error creating event:", error.message);
    throw error;
  }
};

const getEvents = async (updateLink, setLoading, setLinkCreated) => {
  const accessToken = await getAccessToken();
  try {
    const response = await fetch(GOOGLE_CALENDAR_API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    const data = await response.json();
    const filteredEvents = data.items.filter(
      (event) => event.extendedProperties?.private?.eventType === "StressAway"
    );
    let allEvents = [];
    filteredEvents.forEach((element) => {
      allEvents.push({
        meetingName: element.summary,
        meetingLink: element.conferenceData.entryPoints[0].uri,
        meetingPhone: element.conferenceData.entryPoints[1].uri,
        startTime: element.start.dateTime,
        endTime: element.end.dateTime,
        type: element.conferenceData.conferenceSolution.key.type,
      });
    });
    updateLink([...allEvents]);
    setLoading(false);
    setLinkCreated(false);
    return filteredEvents;
  } catch (error) {
    console.error("Error fetching events:", error.message);
    throw error;
  }
};

// Export the functions
export { createMeetEvent, getAccessToken, getEvents };
