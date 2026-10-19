/**
 * MKC01 exact full name + NAP. Name = the store's full name as used on its Google Business Profile.
 * Public GBP primary phone only. Map link = this store's own Google place ID.
 */
export const FULL_NAME_NAP = {
  "code": "MKC01",
  "fullName": "Main Kingston Cannabis Dispensary Weed Delivery",
  "street": "615 Kingston Rd",
  "city": "Toronto",
  "region": "ON",
  "postal": "M4E 1R3",
  "phoneDisplay": "(289) 460-0130",
  "phoneTel": "tel:+12894600130",
  "hours": "Open 24 hours, 7 days a week",
  "mapsUrl": "https://www.google.com/maps/place/?q=place_id:ChIJJSoPMOnN1IkRTgXIY59cr6U",
  "placeId": "ChIJJSoPMOnN1IkRTgXIY59cr6U",
  "neighbourhood": "Kingston Road / Upper Beaches",
  "intersection": "",
  "transit": "A short walk south of Main Street Station on Line 2. The 64 Main bus follows Main Street; the 503 Kingston Rd streetcar serves the corridor when in service.",
  "visitPath": "/visit"
} as const;

export const FULL_NAME_NAP_ADDRESS = `${FULL_NAME_NAP.street}, ${FULL_NAME_NAP.city}, ${FULL_NAME_NAP.region} ${FULL_NAME_NAP.postal}`;
