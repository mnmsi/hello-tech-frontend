import style from "@/styles/components/sectionTitle.module.scss";
const SectionTitle = ({ title }) => {
  return <h2 className={style.title}>{title}</h2>;
};

export default SectionTitle;
