using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DomainModel;

public partial class Task
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int? IdworkerCoder { get; set; }

    public int? IdworkerAnalyst { get; set; }

    public int? IdworkerMentor { get; set; }

    public int? IdworkerTester { get; set; }

    public int Idproject { get; set; }

    public string Category { get; set; } = null!;

    public string State { get; set; } = null!;

    public string Priority { get; set; } = null!;

    public DateOnly? Deadline { get; set; }

    public virtual Project? IdprojectNavigation { get; set; }

    public virtual Worker? IdworkerAnalystNavigation { get; set; }

    public virtual Worker? IdworkerCoderNavigation { get; set; }

    public virtual Worker? IdworkerMentorNavigation { get; set; }

    public virtual Worker? IdworkerTesterNavigation { get; set; }

    public virtual Message? Message { get; set; }

    public virtual ICollection<Track> Tracks { get; set; } = new List<Track>();
}
