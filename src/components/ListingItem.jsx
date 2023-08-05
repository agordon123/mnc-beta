import Moment from "react-moment";
import { Link } from "react-router-dom";
import { MdLocationOn, MdEdit } from "react-icons/md";
import { FaTrash, FaMapMarkerAlt } from "react-icons/fa";

// Listing Item component
const ListingItem = ({ listing, id, onEdit, onDelete }) => {
  return (
    <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
      {/* Clicking on listing component redirects user to full listing page */}
      <Link className="contents" to={`/category/${listing.type}/${id}`}>
        {/* Displays first selected image when listing was created */}
        <img
          className="grayscale h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
          loading="lazy"
          src={listing.imgUrls[0]}
          alt=""
        />
        <Moment
          className="absolute top-2 left-2 bg-gray-500 text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
          fromNow
        >
          {listing.timestamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <FaMapMarkerAlt className="h-4 w-4 text-gray-600" />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
              {listing.address}
            </p>
          </div>
          <p className="font-semibold m-0 text-xl truncate">{listing.name}</p>

          {/* Displays discounted price if available, otherwise displays regular price (added commas for readability) */}
          <p className="text-gray-500 mt-2 font-semibold">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / month"}
          </p>

          {/* Displays number of bedrooms and bathrooms */}
          <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : "1 Bath"}
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* Displays delete icon with listing on profile page */}
      {onDelete && (
        <FaTrash
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer"
          onClick={() => onDelete(listing.id)}
        />
      )}

      {/* Displays edit icon with listing on profile page */}
      {onEdit && (
        <MdEdit
          className="absolute bottom-2 right-7 h-4 cursor-pointer"
          onClick={() => onEdit(listing.id)}
        />
      )}
    </li>
  );
};

export default ListingItem;