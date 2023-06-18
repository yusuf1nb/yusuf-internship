import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import axios from "axios";

const Author = () => {
  const { id } = useParams();
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  async function fetchAuthors() {
    const res = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    const { data } = res;
    setAuthors(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchAuthors();
  }, [id]);

  function toggleFollow() {
    setIsFollowing(true);
    const followersCount = authors.followers;
    setAuthors({ ...authors, followers: followersCount + 1 });
  }

  function toggleUnfollow() {
    setIsFollowing(false);
    const followersCount = authors.followers;
    setAuthors({ ...authors, followers: followersCount - 1 });
  }
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {isLoading ? (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton
                          width={150}
                          height={150}
                          borderRadius={"50%"}
                        />
                        <i className="fa fa-check" style={{ zIndex: 1 }}></i>
                        <div className="profile_name">
                          <h4>
                            <Skeleton width={200} />
                            <span className="profile_username">
                              <Skeleton width={100} />
                            </span>
                            <span id="wallet" className="profile_wallet">
                              <Skeleton width={200} />
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          <Skeleton width={122.5} height={42} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={authors.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {authors.authorName}
                            <span className="profile_username">
                              {authors.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {authors.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {authors.followers} followers
                        </div>
                        {isFollowing ? (
                          <Link
                            to="#"
                            className="btn-main"
                            onClick={() => toggleUnfollow()}
                          >
                            Unfollow
                          </Link>
                        ) : (
                          <Link
                            to="#"
                            className="btn-main"
                            onClick={() => toggleFollow()}
                          >
                            Follow
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems data={authors} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
