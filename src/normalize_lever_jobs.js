const jobs = $input.all();

return jobs.map(item => {
  const job = item.json;

  return {
    json: {
      source: "lever",
      source_id: job.id,

      title: job.text ?? null,
      company: "SFEIR",

      location: job.categories?.location ?? null,
      team: job.categories?.team ?? null,
      contract_type: job.categories?.commitment ?? null,

      description: job.descriptionPlain ?? null,

      job_url: job.hostedUrl ?? null,
      apply_url: job.applyUrl ?? null,

      collected_at: new Date().toISOString()
    }
  };
});