import SectionTicker from './SectionTicker';

const ALL_SKILLS = [
    'Python', 'React', 'Docker', 'Java', 'Spring Boot', 'FastAPI',
    'PostgreSQL', 'AWS EC2', 'Machine Learning', 'NLP', 'Git', 'Linux',
    'JavaScript', 'C#', 'AWS S3', 'PostGIS', 'LSTM', 'GitHub', 'OOP', 'TypeScript',
];

export default function SkillsTicker() {
    return <SectionTicker items={ALL_SKILLS} speed={36} direction={1} />;
}
