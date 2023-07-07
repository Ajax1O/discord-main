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
    const targetRole = interaction.options.get("target-role").value;

    await interaction.deferReply();

    // check if the member that ran the command has permissions to delete roles
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
      interaction.reply("You don't have the permissions to delete roles.");
    }

    try {
      interaction.editReply(`Role '<@${targetRole}>' was deleted.`);

      await interaction.guild.roles.delete(`${targetRole}`);
    } catch (error) {
      console.log(`❕ [-] There was an error: ${error}`);
      interaction.editReply(`There was an error deleting this role: ${error}`);
    }
  },
  name: "delete-role",
  description: "Delete a role using this command!",
  options: [
    {
      name: "target-role",
      description: "Name of the role you would like to delete.",
      type: ApplicationCommandOptionType.Role,
      required: true,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.ManageRoles],
  botPermissions: [PermissionFlagsBits.ManageRoles],
};
