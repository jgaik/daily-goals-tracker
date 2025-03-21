import "./page.scss";

export default function Sources() {
  return (
    <section className="sources">
      <h6>ToKini Andy&apos;s YouTube video inspiration</h6>
      <iframe
        src="https://www.youtube.com/embed/7ELqLfEXrds?si=MlIMlsbvzn3K2dJ-"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <h6>Google Sheet data source</h6>
      <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0MlfHDS_YNZlxKUudajPr6HVtTwlzuKakcAHcr7wc0cD_jdmqLXKGCJhn9aa2OPSlBMzIDFZ0rUkk/pubhtml?widget=true&amp;headers=false" />
    </section>
  );
}
