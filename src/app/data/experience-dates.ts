export interface ExperienceDate {
  start: Date;
  end: Date | 'present';
}

// if there is no end date, use 'present'
//end: 'present'

export const ExperienceDates = {
  senior_software_engineer: {
    start: new Date('2023-04-01'),
    end: new Date('2025-01-29')
  },
  
  software_engineer: {
    start: new Date('2022-04-01'),
    end: new Date('2023-03-31')
  },
  
  full_stack_developer: {
    start: new Date('2020-11-01'),
    end: new Date('2023-05-31')
  },
  
  junior_programmer: {
    start: new Date('2020-03-01'),
    end: new Date('2022-03-30')
  },
  
  internship: {
    start: new Date('2019-11-01'),
    end: new Date('2020-02-29')
  }
} as const;
