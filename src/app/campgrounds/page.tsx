import { Campgrounds } from "@/components/pages/Campgrounds";
import { MapBox } from "@/components/utils/MapBox";

export default function Campground() {
  return (
      <div className="2xl:container mx-auto px-4">
        <MapBox />
        <Campgrounds />
      </div>
  );
}
