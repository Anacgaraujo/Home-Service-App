import { request, gql } from "graphql-request";

const MASTER_URL =
  "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clr6u6t1c0ck201w7vysi38uo/master";

const getSlider = async () => {
  const document = gql`
    query GetSlider {
      sliders {
        id
        name
        image {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, document);
  return result;
};

const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        id
        icon {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessList = async () => {
  const query = gql`
    query GetCategoriesetBusinessList {
      categories {
        name
        id
        icon {
          url
        }
      }
      businessLists {
        id
        name
        category {
          name
        }
        contactPerson
        email
        address
        about
        images {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessListByCategory = async (category) => {
  const query = gql`
    query GetBusinessListByCategory {
      businessLists(where: {category: {name: "${category}"}}) {
        id
        name
        email
        contactPerson
        category {
          name
        }
        address
        about
        images {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const createBooking = async (data) => {
  const mutationQuery =
    gq1`
  mutation createBooking {
    createBooking(
      data: {bookingStatus: Booked, 
        businessList: {connect: {id: "` +
    data.businessId +
    `"}}, 
        date: "` +
    data.date +
    `", 
        time: "` +
    data.time +
    `", 
        userEmail: "` +
    data.userEmail +
    `", 
        userName: "` +
    data.userName +
    `"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED){
      count
    }
  }`;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

const getUserBookings = async () => {
  const query = gql`
    query getUserBookings {
      bookings(orderBy: updatedAt_DESC) {
        time
        userEmail
        userName
        bookingStatus
        date
        id
        businessList {
          id
          images {
            url
          }
          name
          address
          contactPerson
          email
          about
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export default {
  getSlider,
  getCategories,
  getBusinessList,
  getBusinessListByCategory,
  createBooking,
  getUserBookings,
};
