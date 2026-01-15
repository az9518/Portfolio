'use client';

import { ExternalLink, Briefcase, GraduationCap, Award } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { education as educationData, experience as experienceData, achievements as achievementsData } from '@/lib/resume-data';

export default function ResumeSection() {
  // Transform education data to match component structure
  const education = educationData.map(edu => ({
    degree: edu.degree,
    institution: `${edu.institution}, ${edu.location}`,
    period: edu.period,
    description: edu.score,
  }));

  // Transform experience data to match component structure
  const experience = experienceData.map(exp => ({
    title: exp.title,
    company: exp.company,
    period: exp.period,
    responsibilities: exp.responsibilities,
  }));

  // Transform achievements data to match component structure
  const achievements = achievementsData.map(achievement => ({
    name: achievement.title,
    issuer: achievement.description,
    date: '',
  }));

  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8 w-full bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.1),transparent_50%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Resume
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            My professional journey, education, and achievements
          </p>
          <Link href="/resume">
            <Button
              className="mt-6 gap-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] transition-all duration-300"
              size="lg"
            >
              <ExternalLink className="w-4 h-4" />
              View Full Resume
            </Button>
          </Link>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-primary">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="space-y-2 border-l-2 border-primary/20 pl-4">
                    <h3 className="font-semibold text-foreground font-headline">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground font-body">{edu.institution}</p>
                    <p className="text-sm text-primary font-code">{edu.period}</p>
                    <p className="text-sm text-muted-foreground font-body">{edu.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-primary">
                  <Award className="w-5 h-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="space-y-1 border-l-2 border-accent/20 pl-4">
                    <h3 className="font-semibold text-foreground font-headline">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground font-body">{achievement.issuer}</p>
                    {achievement.date && <p className="text-sm text-primary font-code">{achievement.date}</p>}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Card className="mt-8 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary transition-colors duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-primary">
                <Briefcase className="w-5 h-5" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {experience.map((exp, index) => (
                <div key={index} className="space-y-3 border-l-2 border-secondary/20 pl-4">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground font-headline">{exp.title}</h3>
                    <p className="text-muted-foreground font-body">{exp.company}</p>
                    <p className="text-sm text-primary font-code">{exp.period}</p>
                  </div>
                  <ul className="space-y-2 ml-4">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start font-body">
                        <span className="text-primary mr-2">•</span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
