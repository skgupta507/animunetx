import axios from "axios";
import { url } from "@/config/url";
import EpisodeContainer from "@/components/EpisodeContainer";

const Info = ({ data, details }: any) => {
  console.log(data[1].url);

  return (
    // <>
    <div className="pb-96">
      {/* Embed the iframe with the URL */}
      <iframe
        src={data[1].url}
        title="Embedded Video"
        width="100%"
        height="450"
        allowFullScreen
        className="max-w-3xl mx-auto px-4 pt-10"
      ></iframe>
      <EpisodeContainer data={details} />
    </div>
    // </>
  );
};

export async function getServerSideProps(context: any) {
  const {
    query: { id, episode },
  } = context;
  console.log(id + episode);

  try {
    const watch_res = await axios.get(url.episode_link + id + "-episode-" + episode);
    const details_res = await axios.get(url.info + id);
    const details = details_res.data;
    const data = watch_res.data;
    console.log(data)

    return {
      props: {
        data,
        details,
      },
    };
  } catch (error) {
    console.error("Error fetching details:", error);
    return {
      props: {
        data: null, // or handle error as needed
      },
    };
  }
}

export default Info;