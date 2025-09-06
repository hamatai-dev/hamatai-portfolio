import Image from "next/image";
import { works } from "@/data/work";
import { Work } from "@/types/work";

export default function Works() {
  return (
    <div className="min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Works</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work: Work) => (
            <div key={work.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <Image 
                  src={work.image} 
                  alt={work.title} 
                  width={400}
                  height={192}
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{work.title}</h3>
                <p className="text-gray-600 mb-4">{work.description}</p>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {work.technologies.map((tech: string) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {work.liveUrl && (
                    <a 
                      href={work.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      サイトを見る
                    </a>
                  )}
                  {work.githubUrl && (
                    <a 
                      href={work.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}