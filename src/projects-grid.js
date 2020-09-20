import React, { Fragment } from "react";
import useFetch from "use-http";

const getLanguageColor = (language) => {
  switch (language) {
    case "CSS":
    case "TypeScript":
      return "bg-blue-600";
    case "JavaScript":
      return "bg-yellow-500";
    case "Python":
      return "bg-blue-700";
    case "PHP":
      return "bg-purple-700";
    case "C++":
      return "bg-pink-500";
    case "Ruby":
      return "bg-red-600";
    case "Vue":
      return "bg-green-400";
    default:
      return "bg-gray-900";
  }
};

const ICONS = {
  star: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{
        display: "inline-block",
        height: "1em",
        width: "1em",
        fill: "currentcolor",
      }}
    >
      <path
        class="heroicon-ui"
        d="M6.1 21.98a1 1 0 0 1-1.45-1.06l1.03-6.03-4.38-4.26a1 1 0 0 1 .56-1.71l6.05-.88 2.7-5.48a1 1 0 0 1 1.8 0l2.7 5.48 6.06.88a1 1 0 0 1 .55 1.7l-4.38 4.27 1.04 6.03a1 1 0 0 1-1.46 1.06l-5.4-2.85-5.42 2.85zm4.95-4.87a1 1 0 0 1 .93 0l4.08 2.15-.78-4.55a1 1 0 0 1 .29-.88l3.3-3.22-4.56-.67a1 1 0 0 1-.76-.54l-2.04-4.14L9.47 9.4a1 1 0 0 1-.75.54l-4.57.67 3.3 3.22a1 1 0 0 1 .3.88l-.79 4.55 4.09-2.15z"
      />
    </svg>
  ),
};

export const ProjectsGrid = ({ username, repos = [] }) => {
  const {
    loading,
    error,
    data,
  } = useFetch(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    {},
    [username]
  );
  if (loading) {
    return "Loading...";
  }
  if (error) {
    return "Error fetching projects";
  }
  return (
    <>
      <div
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
        className="pt-2 grid gap-2"
      >
        {data
          .filter(({ name }) => repos.includes(name))
          .map(
            ({
              id,
              html_url,
              name,
              description,
              language,
              stargazers_count,
              forks_count,
            }) => (
              <a key={id} href={html_url}>
                <div className="shadow-xs rounded p-3 hover:bg-gray-100">
                  <div>
                    <h3 className="text-lg font-mono">{name}</h3>
                    <span>{description}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {language && (
                      <span>
                        <div
                          className={`inline-block mr-1 w-3 h-3 rounded-full ${getLanguageColor(
                            language
                          )}`}
                        />
                        {language}
                      </span>
                    )}
                    {Boolean(stargazers_count) && (
                      <div className="inline-flex items-center">
                        {ICONS.star}
                        <span>{stargazers_count}</span>
                      </div>
                    )}
                  </div>
                </div>
              </a>
            )
          )}
      </div>
      <a
        className="text-blue-900 bg-blue-100 border-b-2 border-blue-200 mt-2 inline-block"
        href={`https://github.com/${username}`}
      >
        See more →
      </a>
    </>
  );
};
