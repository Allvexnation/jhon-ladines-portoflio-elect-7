'use client';

import { useEffect, useState } from 'react';
import subjectsData from '@/static/subjects.json';
import LineSidebar from '@/components/LineSidebar';

interface SubjectsProps {
  isDarkMode: boolean;
}

export default function Subjects({ isDarkMode }: SubjectsProps) {
  const [subjects, setSubjects] = useState<string[]>([]);

  useEffect(() => {
    setSubjects(subjectsData.subjects);
  }, []);

  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <tbody>
          <tr>
            <td className={`p-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
              <ul className="list-none p-0 m-0 pointer-events-none">
                <li className="p-0 m-0 pointer-events-auto">
                  <LineSidebar
                    items={subjects}
                    accentColor="#A855F7"
                    textColor={isDarkMode ? '#c4c4c4' : '#333333'}
                    markerColor="#6c6c6c"
                    showIndex
                    showMarker
                    proximityRadius={100}
                    maxShift={30}
                    falloff="smooth"
                    markerLength={60}
                    markerGap={0}
                    tickScale={0.5}
                    scaleTick
                    itemGap={20}
                    fontSize={1.1}
                    smoothing={100}
                    defaultActive={0}
                    onItemClick={(index, label) => console.log(index, label)}
                  />
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}