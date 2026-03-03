const { configureWorkflow, startWorkflow } = await import('./.local/skills/workflows/workflows.js');

async function run() {
  try {
    await configureWorkflow({
      name: "Start Server",
      command: "node server.js",
      is_default: true
    });
    console.log("Workflow configured");
    
    await startWorkflow({ name: "Start Server" });
    console.log("Workflow started");
  } catch (e) {
    console.error("Workflow error:", e);
  }
}

run();
