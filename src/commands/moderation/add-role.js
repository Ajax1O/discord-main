const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  /**
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    const roleName = interaction.options.get("role-name").value;

    await interaction.deferReply();

    // check if the member that ran the command has permissions to make the role
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
      interaction.reply("You don't have the permissions to create this role.");
    }

    try {
      await interaction.guild.roles.create({
        name: `${roleName}`,
        color: "Random",
      });

      interaction.editReply(`Role '${roleName}' was created.`);
    } catch (error) {
      console.log(`❕ [-] There was an error: ${error}`);
      interaction.editReply(`There was an error creating this role: ${error}`);
    }
  },
  name: "add-role",
  description: "Create a role using this command!",
  options: [
    {
      name: "role-name",
      description: "Name of the role you would like to create.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.ManageRoles],
  botPermissions: [PermissionFlagsBits.ManageRoles],
};
