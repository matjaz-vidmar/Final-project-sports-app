export function getSportsWithVenues(sportWithVenues) {
  const sport = {
    sportId: sportWithVenues[0].sportId,
    sportName: sportWithVenues[0].sportName,
    venues: sportWithVenues.map((sportWithVenue) => {
      return {
        name1: sportWithVenue.name1,
        address1: sportWithVenue.address1,
        name2: sportWithVenue.name2,
        address2: sportWithVenue.address2,
      };
    }),
  };
  return sport;
}
