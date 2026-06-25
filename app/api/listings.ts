import { AxiosProgressEvent } from "axios";

import apiClient from "./client";

const endpoint = "/listings";

const getListings = () => apiClient.get(endpoint);

type Listing = {
    category: {
      backgroundColor: string;
      iconName: string;
      label: string;
      value: number;
    };
    description: string;
    images: string[];
    location: { latitude: number; longitude: number } | null;
    price: string;
    title: string;
  }

const addloadListing = (
  listing: Listing,
  onUploadProgress: (percentage: number) => void,
) => {
  const data = new FormData();

  data.append("categoryId", listing.category.value.toString());
  data.append("description", listing.description);

  listing.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    } as any),
  );

  if (listing.location !== null)
    data.append("location", JSON.stringify(listing.location));

  data.append("price", listing.price);
  data.append("title", listing.title);

  return apiClient.post(endpoint, data, {
    headers: { "Content-Type": "multipart/form-data" },
    // Note: Axios does not provide a built-in way to track upload progress in React Native, so we use onDownloadProgress as a workaround to animate progress bar.
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
      const totalBytes = progressEvent.total ?? 0;
      const loadedBytes = progressEvent.loaded;

      if (totalBytes > 0) {
        const percentage = Math.round((loadedBytes * 100) / totalBytes);
        onUploadProgress(percentage);
      }
    },
  });
};

export default {
  getListings,
  addloadListing,
};
